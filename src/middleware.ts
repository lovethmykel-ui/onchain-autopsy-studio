import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const demoCookie = request.cookies.get('operator-auth')?.value
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const isSupabaseConfigured = Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-supabase-anon-key') &&
    !supabaseUrl.includes('mxjbdkkrvzrmnmxbasmq') // expired/deleted project URL
  )

  let user = null
  if (demoCookie === 'active') {
    user = { id: 'demo-operator-id', email: 'operator@onchain-autopsy.com' }
  } else if (isSupabaseConfigured) {
    try {
      const { data } = await supabase.auth.getUser()
      user = data?.user ?? null
    } catch {
      user = null
    }
  }

  // Protected routes: anything that is NOT /login
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isStatic = request.nextUrl.pathname.includes('.')

  if (!isStatic && !isApiRoute) {
    // If Supabase is not configured yet, permit direct access
    if (!isSupabaseConfigured) {
      return supabaseResponse
    }

    if (!user && !isLoginPage) {
      // Redirect unauthenticated users to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (user && isLoginPage) {
      // Redirect authenticated users away from login to dashboard
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
