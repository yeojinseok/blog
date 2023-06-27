import PostDetail from "@/components/post/PostDetail";
import { getPosts } from "@/service/post";
import { Suspense } from "react";

type Props = {
  params: {
    slug: string;
    title: string;
  };
};

export default function PostDetailPage({ params }: Props) {
  const { slug: postID } = params;

  return (
    <Suspense fallback={<>loading</>}>
      {/* @ts-expect-error Async Server Component */}
      <PostDetail postID={postID} />
    </Suspense>
  );
}

export function generateMetadata({ params }: Props) {
  return {
    title: `${params.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post._id,
    title: post.title,
  }));
}
