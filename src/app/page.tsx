import React from 'react'
import PostList from '@/components/home/PostList'
import { Suspense } from 'react'
import Profile from '@/components/home/Profile'
import { HStack, VStack } from '@/components/design-system/Stack'
import AirplaneBar from '@/features/home/AirplaneBar'

export default function Home() {
  return (
    <>
      <VStack className="gap-16 ">
        <HStack className="justify-center ">
          <Profile />
        </HStack>
        <AirplaneBar />
        {/* @ts-expect-error Async Server Component */}
        {/* <PostList /> */}
      </VStack>
    </>
  )
}
