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

async function clearData() {
  const tables = [
    'generated_audio',
    'generated_videos',
    'generated_images',
    'storyboards',
    'scripts',
    'research',
    'projects',
    'api_keys'
  ]

  for (const table of tables) {
    console.log(`Clearing ${table}...`)
    // Delete all rows where id is not null (which means all rows)
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (error) {
      console.error(`Error clearing ${table}:`, error)
    } else {
      console.log(`Successfully cleared ${table}`)
    }
  }

  // Also clear storage buckets if they exist
  const { data: buckets } = await supabase.storage.listBuckets()
  if (buckets) {
    for (const bucket of buckets) {
      console.log(`Emptying bucket ${bucket.name}...`)
      const { data: files } = await supabase.storage.from(bucket.name).list()
      if (files && files.length > 0) {
        const fileNames = files.map(f => f.name)
        await supabase.storage.from(bucket.name).remove(fileNames)
      }
    }
  }

  console.log('All data cleared successfully!')
}

clearData()
