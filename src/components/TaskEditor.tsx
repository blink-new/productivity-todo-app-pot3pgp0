
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface TaskEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function TaskEditor({ content, onChange, placeholder = 'Add notes...' }: TaskEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background">
      <EditorContent editor={editor} className="prose prose-sm max-w-none" />
    </div>
  )
}