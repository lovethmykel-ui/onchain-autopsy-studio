import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createUsers() {
  const usersToCreate = [
    { email: 'mickel.lucky@gmail.com', password: 'Mahreen@2022' },
    { email: 'okoisubra@gmail.com', password: 'OKoi21%%' }
  ]

  for (const user of usersToCreate) {
    console.log(`Creating user ${user.email}...`)
    
    // We use admin.createUser to bypass email confirmation
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    })

    if (error) {
      if (error.message.includes('already has an account')) {
        console.log(`User ${user.email} already exists.`)
      } else {
        console.error(`Error creating user ${user.email}:`, error)
      }
    } else {
      console.log(`Successfully created user ${user.email} with ID ${data.user.id}`)
    }
  }
}

createUsers()
