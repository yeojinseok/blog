'use client'
import React from 'react'

// import '@uiw/react-md-editor/markdown-editor.css'
// import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
)

export default function MarkdownEditor() {
  const [value, setValue] = useState<string | undefined>('asdf')

  return (
    <div>
      <MDEditor value={value} onChange={setValue} height={800} />
    </div>
  )
}
