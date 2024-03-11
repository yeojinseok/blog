import { client } from '@/sanity/sanityClient'
import { Post } from '@/types/post'
import axios from 'axios'

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"] | order(_createdAt desc)`)
}

export async function getPostByID(postID: string): Promise<Post> {
  return client
    .fetch(`*[_type == "post" && _id == "${postID}"]`)
    .then(v => v[0])
}

export async function createPost(body: Partial<Post>) {
  return axios.post('/api/post', { ...body })
}
