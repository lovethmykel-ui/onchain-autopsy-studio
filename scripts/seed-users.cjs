const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const envPath = path.resolve(process.cwd(), '.env.local')
const envConfig = fs.readFileSync(envPath, 'utf-8').split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) acc[match[1]] = match[2].trim()
  return acc
}, {})

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL']
const supabaseServiceKey = envConfig['SUPABASE_SERVICE_ROLE_KEY']

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
      if (error.message.includes('already has an account') || error.message.includes('already exists')) {
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
