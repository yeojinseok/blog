import MarkdownEditor from '@/components/MarkdownEditor'

// const MDEditor = dynamic(
//   () => import("@uiw/react-md-editor"),
//   { ssr: false }
// );

// const EditerMarkdown = dynamic(() =>
//   import('@uiw/react-md-editor').then(mod => {
//     return mod.default.Markdown
//   })
// )

export default async function PostDetail() {
  return (
    <div data-color-mode="dark">
      <MarkdownEditor />{' '}
    </div>
  )
}
