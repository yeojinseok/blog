import PostDetail from "@/components/post/PostDetail";
import { getPostByID, getPosts } from "@/service/post";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 24;

type Props = {
  params: {
    slug: string;
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

export async function generateMetadata({ params }: Props) {
  const post = await getPostByID(params.slug);
  return {
    title: `${post.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post._id,
  }));
}
