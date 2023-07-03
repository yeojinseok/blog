import React from 'react'
import PostList from '@/components/home/PostList'
import { Suspense } from 'react'
import Profile from '@/components/home/Profile'

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-11">
        <div className="flex justify-center border-b-2 border-gray-200 p-10">
          <Profile />
        </div>
        {/* <img src={asdf} /> */}
        {/* @ts-expect-error Async Server Component */}
        <PostList />
      </div>
    </>
  )
}
