import PostItem from "../post/PostItem";
import { getPosts } from "@/service/post";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-4 gap-1 place-items-center ">
      {posts?.post.map((v) => (
        <PostItem key={v._id} post={v} />
      ))}
    </div>
  );
}
