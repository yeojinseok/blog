import { getPostByID, getPosts } from "@/service/post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function PostDetail({ postID }: { postID: string }) {
  const post = await getPostByID(postID);

  return (
    <div className="prose">
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
}
