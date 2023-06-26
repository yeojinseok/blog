import { getPostByID } from "@/service/post";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default async function PostDetail({ postID }: { postID: string }) {
  const post = await getPostByID(postID);

  console.log(post.post[0].content);
  return (
    <div className="prose">
      <ReactMarkdown>{post.post[0].content}</ReactMarkdown>
    </div>
  );
}
