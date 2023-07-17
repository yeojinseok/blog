'use client'
import React, { SetStateAction } from 'react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { uploadFile } from '@/module/aws/fileUpload'
import axios from 'axios'
import { createPost } from '@/service/post'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
)

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string | undefined>('')

  return (
    <div className=" pt-10">
      <MDEditor
        style={{
          border: '1px solid',
        }}
        value={markdown}
        onChange={setMarkdown}
        onPaste={async event => {
          await onImagePasted(event.clipboardData, setMarkdown)
        }}
        onDrop={async event => {
          event.preventDefault()
          await onImagePasted(event.dataTransfer, setMarkdown)
        }}
        textareaProps={{
          placeholder: 'Fill in your markdown for the coolest of the cool.',
        }}
        hideToolbar
      />
      <button
        onClick={() => {
          createPost({
            title: 'testtitle',
            content: markdown,
          })
        }}
      >
        create
      </button>
    </div>
  )
}

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: (value: SetStateAction<string | undefined>) => void
) => {
  const files: File[] = []
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index)

    if (file) {
      files.push(file)
    }
  }

  await Promise.all(
    files.map(async file => {
      const url = await uploadFile(file)
      const insertedMarkdown = insertToTextArea(`![](${url})`)
      if (!insertedMarkdown) {
        return
      }
      setMarkdown(insertedMarkdown)
    })
  )
}

const insertToTextArea = (insertString: string) => {
  const textarea = document.querySelector('textarea')
  if (!textarea) {
    return null
  }

  let sentence = textarea.value
  const len = sentence.length
  const pos = textarea.selectionStart
  const end = textarea.selectionEnd

  const front = sentence.slice(0, pos)
  const back = sentence.slice(pos, len)

  sentence = front + insertString + back

  textarea.value = sentence
  textarea.selectionEnd = end + insertString.length

  return sentence
}

//https://github.com/uiwjs/react-md-editor/issues/83
