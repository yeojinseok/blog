"use client";
import { urlFor } from "@/sanity/imageBuilder";
import { Post } from "@/service/post";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter();

  const onClickItem = () => {
    router.push(`/post/${post._id}`);
  };

  return (
    <div
      onClick={onClickItem}
      className=" flex flex-col justify-center items-center rounded-2xl border-2 cursor-pointer max-w-350 min-w-200 aspect-square w-full overflow-hidden"
    >
      <div className=" w-full h-1/2 rounded-2xl relative">
        <Image
          src={urlFor(post.imageURL).url()}
          alt="image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="w-full h-1/2 flex">{post.title}</div>
    </div>
  );
}
