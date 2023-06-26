import PostDetail from "@/components/post/PostDetail";
import { Suspense } from "react";

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: postID } = params;

  return (
    <Suspense fallback={<>loading</>}>
      <PostDetail postID={postID} />
    </Suspense>
  );
}

// export async function generateStaticParams() {
//   const posts = await
// }
