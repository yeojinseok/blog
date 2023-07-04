import { client } from '@/sanity/sanityClient'
import axios from 'axios'

export type Post = {
  _id: string
  title: string
  _updatedAt: string
  content: string
  _createdAt: string
  imageURL: string
  views?: number
  likes?: number
  tags?: string[]
  categories?: string[]
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"]`)
}

export async function getPostByID(postID: string): Promise<Post> {
  return client
    .fetch(`*[_type == "post" && _id == "${postID}"]`)
    .then(v => v[0])
}
