'use client'
import React, { SetStateAction } from 'react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
)

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string | undefined>('asdf')

  return (
    <div>
      <MDEditor
        value={markdown}
        onChange={value => {
          setMarkdown(value)
        }}
        onPaste={async event => {
          await onImagePasted(event.clipboardData, setMarkdown)
        }}
        onDrop={async event => {
          await onImagePasted(event.dataTransfer, setMarkdown)
        }}
        height={440}
        textareaProps={{
          placeholder: 'Fill in your markdown for the coolest of the cool.',
        }}
        hideToolbar
      />
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
      // const url = await fileUpload(file)
      const url = '' //FIXME: URL 업로드하는 로직 구성해야함.
      const insertedMarkdown = insertToTextArea(`![](${url})`)
      if (!insertedMarkdown) {
        return
      }
      setMarkdown(insertedMarkdown)
    })
  )
}

const insertToTextArea = (intsertString: string) => {
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

  sentence = front + intsertString + back

  textarea.value = sentence
  textarea.selectionEnd = end + intsertString.length

  return sentence
}

//https://github.com/uiwjs/react-md-editor/issues/83
