import MarkdownEditor from '@/components/MarkdownEditor'
import PostEditor from '@/components/post/PostEditor'

export default async function CreatePostPage() {
  return (
    <div className="w-full h-full ">
      <PostEditor />
    </div>
  )
}
