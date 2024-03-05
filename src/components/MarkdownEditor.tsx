'use client'
import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { uploadFile } from '@/module/aws/fileUpload'
import { nanoid } from 'nanoid'
import { MDEditorProps } from '@uiw/react-md-editor'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
)

export default function MarkdownEditor(
  props: MDEditorProps & { postID?: string }
) {
  const [height, setHeight] = useState(0)

  const editorContainerRef = useRef<HTMLDivElement>(null)
  const postIDRef = React.useRef(props.postID ?? nanoid())

  const onChangeContentHandler = (value: string | undefined) => {
    props.onChange?.(value)
  }

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setHeight(entries[0].contentRect.height)
    })

    if (editorContainerRef.current) {
      observer.observe(editorContainerRef.current)
    }

    return () => {
      if (editorContainerRef.current) {
        observer.unobserve(editorContainerRef.current)
      }
    }
  }, [])

  return (
    <div ref={editorContainerRef} className="h-full p-16 pb-200">
      <MDEditor
        {...props}
        height={height}
        onChange={onChangeContentHandler}
        onPaste={async event => {
          if (event.clipboardData.files.length > 0) {
            event.preventDefault()
            await onImagePasted(
              event.clipboardData,
              onChangeContentHandler,
              postIDRef.current
            )
          }
        }}
        onDrop={async event => {
          event.preventDefault()
          await onImagePasted(
            event.dataTransfer,
            onChangeContentHandler,
            postIDRef.current
          )
        }}
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
  setMarkdown: (value: string | undefined) => void,
  postID: string
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
      const url = await uploadFile(file, postID)
      const insertedMarkdown = insertToTextArea(`![](${url})`)
      if (!insertedMarkdown) {
        return
      }
      setMarkdown(insertedMarkdown)
    })
  )
}

const insertToTextArea = (insertString: string) => {
  const textarea = document.querySelector<HTMLTextAreaElement>(
    '.w-md-editor-text-input'
  )
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
