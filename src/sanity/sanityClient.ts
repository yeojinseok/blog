import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})
