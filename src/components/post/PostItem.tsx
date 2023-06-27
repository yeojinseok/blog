"use client";
import { urlFor } from "@/sanity/imageBuilder";
import { Post } from "@/service/post";
import { useRouter } from "next/navigation";

export default function PostItem({ post }: { post: Post }) {
  const router = useRouter();

  const onClickItem = () => {
    router.push(`/post/${post._id}`);
  };

  return (
    <div
      onClick={onClickItem}
      className=" min-w-300 p-2 flex flex-col justify-center items-center rounded border-2 cursor-pointer"
    >
      <img src={urlFor(post.imageURL).url()} />
      {post.title}
    </div>
  );
}
