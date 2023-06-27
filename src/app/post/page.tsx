import React from "react";
import PostList from "@/components/home/PostList";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div>메인화면 </div>

      {/* @ts-expect-error Async Server Component */}
      <PostList />
    </>
  );
}
