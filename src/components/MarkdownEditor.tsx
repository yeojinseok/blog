'use client'
import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { uploadFile } from '@/module/aws/fileUpload'
import { createPost } from '@/service/post'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
)

type CreatePostType = {
  title: string
  content: string | undefined
  postID: string
  tags: string[]
}

export default function MarkdownEditor() {
  const router = useRouter()

  const [postValue, setPostValue] = useState<CreatePostType>({
    title: 'test',
    content: '',
    postID: nanoid(),
    tags: [],
  })

  const [height, setHeight] = useState(0)

  const editorContainerRef = useRef<HTMLDivElement>(null)

  const onChangeContentHandler = (value: string | undefined) => {
    setPostValue(prev => ({ ...prev, content: value }))
  }

  const onChangeTitleHandler: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = event => {
    setPostValue(prev => ({ ...prev, title: event.target.value }))
  }

  const onClickPost = async () => {
    try {
      await createPost({ ...postValue })
      router.replace('/')
    } catch (err) {}
  }

  useEffect(() => {
    // ResizeObserver 인스턴스 생성
    const observer = new ResizeObserver(entries => {
      // entries는 모든 관찰 대상의 배열
      // 여기서는 divRef만 관찰하므로 entries[0]만 존재
      setHeight(entries[0].contentRect.height - 100)
    })

    if (editorContainerRef.current) {
      // divRef가 변화를 감지하도록 observer에 추가
      observer.observe(editorContainerRef.current)
    }

    // cleanup 함수
    return () => {
      if (editorContainerRef.current) {
        // 컴포넌트 unmount시 observer에서 divRef 제거
        observer.unobserve(editorContainerRef.current)
      }
    }
  }, []) // 빈 dependency 배열로 한 번만 실행

  return (
    <div className="h-full  ">
      <div className="flex">
        <textarea
          onChange={onChangeTitleHandler}
          rows={1}
          className=" text-4xl w-full focus:outline-none my-2"
          placeholder="제목을 입력하세요"
          style={{ resize: 'none', border: 0 }}
          onFocus={event => event.preventDefault()}
        />
        <div className="flex items-center">
          <button
            className=" w-20 h-10 border rounded-md bg-blue-400 text-white font-semibold"
            onClick={onClickPost}
          >
            출간하기
          </button>
        </div>
      </div>
      <TagSection tags={postValue.tags} setPostValue={setPostValue} />
      <div ref={editorContainerRef} style={{ height: '90%' }}>
        <MDEditor
          value={postValue.content}
          height={height}
          onChange={onChangeContentHandler}
          onPaste={async event => {
            if (event.clipboardData.files.length > 0) {
              event.preventDefault()
              await onImagePasted(
                event.clipboardData,
                onChangeContentHandler,
                postValue.postID
              )
            }
          }}
          onDrop={async event => {
            event.preventDefault()
            await onImagePasted(
              event.dataTransfer,
              onChangeContentHandler,
              postValue.postID
            )
          }}
          textareaProps={{
            placeholder: 'Fill in your markdown for the coolest of the cool.',
          }}
          hideToolbar
        />
      </div>
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

function TagSection({
  tags,
  setPostValue,
}: {
  tags: string[]
  setPostValue: React.Dispatch<React.SetStateAction<CreatePostType>>
}) {
  const [tag, setTag] = useState('')

  useHotkeys(
    'enter',
    () => {
      if (tag === '') {
        return
      }
      setPostValue(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }))

      setTag('')
    },
    {
      enableOnFormTags: true,
    }
  )

  return (
    <div className="flex flex-row flex-wrap w-1/2 gap-2">
      {tags.map(tag => (
        <div className=" bg-blue-400 text-white p-1 rounded-md" key={tag}>
          {tag}
        </div>
      ))}
      <input
        type="text"
        placeholder="태그를 입력하세요"
        value={tag}
        onChange={v => setTag(v.target.value)}
      />
    </div>
  )
}
