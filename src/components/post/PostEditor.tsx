'use client'
import { CreatePostType, Post } from '@/types/post'
import MarkdownEditor from '../MarkdownEditor'
import { HStack, VStack } from '../design-system/Stack'
import { useForm, Controller } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { useHotkeys } from 'react-hotkeys-hook'
import React from 'react'
import Typography from '../design-system/Typography'
import { createPost } from '@/service/post'
import { useRouter } from 'next/navigation'

import useInputFocusHandler from '@/utils/useIsFocusInput'

export default function PostEditor({ post }: { post?: CreatePostType }) {
  const router = useRouter()

  const methods = useForm<CreatePostType>({
    defaultValues: post ?? {
      postID: nanoid(),
    },
  })

  const onClickPost = async (v: CreatePostType) => {
    try {
      await createPost(v)
      router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <VStack className="w-full h-full">
      <form
        className="w-full h-full"
        onSubmit={methods.handleSubmit(onClickPost)}
      >
        <HStack className="items-center justify-between w-full">
          <VStack className="gap-8">
            <input
              {...methods.register('title')}
              onChange={e => {
                e.preventDefault()
                methods.register('title').onChange(e)
              }}
              className="w-full my-2 text-4xl focus:outline-none"
              placeholder="제목을 입력하세요"
              style={{ resize: 'none', border: 0 }}
            />

            <Controller
              control={methods.control}
              name="tags"
              render={({ field }) => (
                <TagSection
                  tags={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />
          </VStack>

          <button
            className="items-center px-8 rounded-md rounded-10 bg-primary-main h-42"
            type="submit"
          >
            <Typography
              variants=".title_subsection"
              className=" text-text-main"
            >
              출간하기
            </Typography>
          </button>
        </HStack>

        <VStack className="w-full h-full">
          <Controller
            control={methods.control}
            name="content"
            render={({ field }) => (
              <VStack className="w-full h-full">
                <MarkdownEditor
                  {...field}
                  postID={methods.getValues('postID')}
                />
              </VStack>
            )}
          />
        </VStack>
      </form>
    </VStack>
  )
}

function TagSection({
  tags,
  onChange,
}: {
  tags: string[]
  onChange: (...event: any[]) => void
}) {
  const [tag, setTag] = React.useState('')
  const { isFocus, event } = useInputFocusHandler()

  useHotkeys(
    'enter',
    e => {
      if (!isFocus) {
        return
      }

      e.preventDefault()

      if (e.isComposing) {
        return
      }

      if (tag.trim() === '') {
        return
      }

      const newTagList = [...new Set(tags.concat([tag.trim()]))]

      onChange(newTagList)

      setTag('')
    },
    {
      enableOnFormTags: true,
    }
  )

  useHotkeys(
    'Backspace',
    e => {
      if (!isFocus) {
        return
      }

      onChange(tags.slice(0, -1))
    },
    {
      enableOnFormTags: true,
    }
  )

  return (
    <HStack className="items-center h-32 gap-8">
      {tags.map(tag => (
        <div
          onClick={() => {
            onChange(tags.filter(v => v !== tag))
          }}
          className="px-8 py-4 cursor-pointer text-text-main rounded-16 bg-primary-main "
          key={tag}
        >
          {tag}
        </div>
      ))}
      <input
        type="text"
        className="focus:outline-none"
        placeholder="태그를 입력하세요"
        value={tag}
        {...event}
        onChange={v => setTag(v.target.value)}
      />
    </HStack>
  )
}
