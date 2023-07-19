'use client'
import { Post } from '@/service/post'
import { Date } from '@/utils/date'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter()

  const onClickItem = () => {
    router.push(`/post/${post._id}`)
  }

  return (
    <div
      onClick={onClickItem}
      className=" flex flex-col min-h-250 justify-center items-center rounded-2xl border-2 cursor-pointer  w-full overflow-hidden shadow-md"
      style={{
        aspectRatio: 4 / 3,
      }}
    >
      <div className=" w-full h-1/2 rounded-2xl relative">
        <Image
          src={post.thumbnailURL}
          alt="image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="w-full h-1/2 flex flex-col p-2 justify-around">
        <div>
          {post.categories?.length &&
            post.categories.map(category => (
              <span
                key={category}
                className=" text-xs font-medium mr-1 p-1 rounded bg-blue-500 text-white"
              >
                {category}
              </span>
            ))}
        </div>
        <span className="text-xl font-medium">{post.title}</span>
        <div>
          {post.tags &&
            post.tags?.map(tag => (
              <span key={tag} className="mr-1 text-sm text-gray-400">
                {tag}
              </span>
            ))}
        </div>
        <span className=" text-xs">{Date.format(post._createdAt)}</span>
      </div>
    </div>
  )
}
