import PostItem from "../post/PostItem";
import { getPosts } from "@/service/post";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-1 small_devices:grid-cols-2  large_devices:grid-cols-3 desktop_middle:grid-cols-4 gap-1 place-items-center ">
      {posts?.map((v) => (
        <PostItem key={v._id} post={v} />
      ))}
    </div>
  );
}
