'use client'
import { urlFor } from '@/sanity/imageBuilder'
import { Post } from '@/service/post'
import { Date } from '@/utils/date'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter()

  const onClickItem = () => {
    router.push(`/post/${post._id}`)
  }

  console.log(post)

  return (
    <div
      onClick={onClickItem}
      className=" flex flex-col justify-center items-center rounded-2xl border-2 cursor-pointer  w-full overflow-hidden shadow-md"
      style={{
        aspectRatio: 4 / 3,
      }}
    >
      <div className=" w-full h-1/2 rounded-2xl relative">
        <Image
          src={urlFor(post.imageURL).url()}
          alt="image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="w-full h-1/2 flex flex-col p-2 justify-between">
        <div>
          {post.category?.length &&
            post.category.map(category => (
              <span className=" text-xs font-medium mr-1 p-1 rounded bg-blue-500 text-white">
                {category}
              </span>
            ))}
        </div>
        <span className="text-xl font-medium">{post.title}</span>
        <div>
          {post.tag &&
            post.tag?.map(tag => (
              <span className="mr-1 text-sm text-gray-400">{tag}</span>
            ))}
        </div>
        <span className=" text-xs">{Date.format(post._createdAt)}</span>
      </div>
    </div>
  )
}
