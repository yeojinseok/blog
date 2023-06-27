import PostItem from "../post/PostItem";
import { getPosts } from "@/service/post";

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="grid grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 laptop:grid-cols-3 gap-1 place-items-center ">
      {posts?.map((v) => (
        <PostItem key={v._id} post={v} />
      ))}
    </div>
  );
}
