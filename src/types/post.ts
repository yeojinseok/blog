export type Post = {
  _id: string
  title: string
  _updatedAt: string
  content: string
  _createdAt: string
  thumbnailURL: string
  views?: number
  likes?: number
  tags?: string[]
  postID: string
  categories?: string[]
}
