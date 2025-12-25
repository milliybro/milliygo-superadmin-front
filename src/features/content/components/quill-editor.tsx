import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import { uploadImage } from '../api'
import { useImageCompression } from '@/hooks/use-image-compression'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export default function QuillEditor({
  value,
  onChange,
  placeholder,
}: QuillEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const { compress } = useImageCompression(true)

  useEffect(() => {
    if (!editorContainerRef.current || quillRef.current) return

    const quill = new Quill(editorContainerRef.current, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ indent: '+1' }, { indent: '-1' }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
          handlers: {
            image: () => handleImageInsert(quill),
          },
        },
      },
    })

    if (value) {
      const delta = quill.clipboard.convert({ html: value } as any)
      quill.setContents(delta, 'silent')
    }

    quill.on('text-change', () => {
      onChange?.(quill.root.innerHTML)
    })

    const toolbar = editorContainerRef.current.querySelector('.ql-toolbar')
    if (toolbar) editorContainerRef.current.prepend(toolbar)

    quillRef.current = quill
  }, [placeholder, onChange])

  useEffect(() => {
    const quill = quillRef.current
    if (!quill || value === undefined) return

    const currentHtml = quill.root.innerHTML
    if (value !== currentHtml) {
      const delta = quill.clipboard.convert({ html: value } as any)
      quill.setContents(delta, 'silent')
    }
  }, [value])

  const handleImageInsert = async (quill: Quill) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      try {
        const compressed = await compress(file)
        if (!compressed) return

        const url = await uploadHandler(compressed.compressedFile)
        const range = quill.getSelection()
        if (range) {
          quill.insertEmbed(range.index, 'image', url)
          quill.setSelection(range.index + 1)
        }
      } catch (err) {
        console.error('Error uploading image:', err)
      }
    }

    input.click()
  }

  const uploadHandler = async (img: File) => {
    const formData = new FormData()
    formData.append('file', img)
    const res = await uploadImage(formData)
    return res?.file_url
  }

  return (
    <div className="quill-sticky" style={{ minHeight: '300px' }}>
      <div ref={editorContainerRef} style={{ height: '100%' }} />
    </div>
  )
}
