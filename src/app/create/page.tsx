import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MarkdownEditor = dynamic(
  () => import('@/components/MarkdownEditor').then(mod => mod.default),
  { ssr: false, loading: () => <div>loading</div> }
)

export default async function CreatePost() {
  return (
    <div className=" w-full h-full">
      <MarkdownEditor />
    </div>
  )
}
