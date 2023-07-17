import { client } from '@/sanity/sanityClient'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const res = await request.json()
  console.log(res)
  const doc = {
    _type: 'post',
    title: 'test',
    ...res,
  }
  const response = await client.create(doc)
  return NextResponse.json({ response })
}

// export async function createPost(text?: string) {
//   const doc = {
//     _type: 'post',
//     title: 'test',
//     content: text,
//   }
//   client.create(doc)
// }
