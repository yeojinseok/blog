'use client'
import { CreatePostType, Post } from '@/types/post'
import MarkdownEditor from '../MarkdownEditor'
import { HStack, VStack } from '../design-system/Stack'
import { useForm, Controller } from 'react-hook-form'
import { nanoid } from 'nanoid'

export default function PostEditor({ post }: { post?: CreatePostType }) {
  const methods = useForm<CreatePostType>({
    defaultValues: post ?? {
      postID: nanoid(),
    },
  })

  // const onChangeTitleHandler: React.ChangeEventHandler<
  //   HTMLTextAreaElement
  // > = event => {
  //   setPostValue(prev => ({ ...prev, title: event.target.value }))
  // }

  // const onClickPost = async () => {
  //   try {
  //     await createPost({ ...postValue })
  //     router.replace('/')
  //   } catch (err) {}
  // }
  return (
    <VStack className="w-full h-full">
      <form className="w-full h-full">
        <div className="flex">
          <input
            {...methods.register('title')}
            className="w-full my-2 text-4xl focus:outline-none"
            placeholder="제목을 입력하세요"
            style={{ resize: 'none', border: 0 }}
          />
          <div className="flex items-center">
            <button
              className="w-20 h-10 font-semibold text-white bg-blue-400 border rounded-md "
              type="submit"
            >
              출간하기
            </button>
          </div>
        </div>
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
