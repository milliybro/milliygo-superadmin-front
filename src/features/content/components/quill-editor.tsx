import { useEffect, useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'

import { uploadImage } from '../api'

import 'react-quill/dist/quill.snow.css'
import { useImageCompression } from '@/hooks/use-image-compression'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null)
  const { compress } = useImageCompression(true)

  const uploadHandler = async (img: File) => {
    const formData = new FormData()
    formData.append('file', img)

    const res = await uploadImage(formData)
    return res?.file_url
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      try {
        const compressed = await compress(file)

        if (!compressed) return

        const url = await uploadHandler(compressed)

        const editor = quillRef.current?.getEditor()
        const range = editor?.getSelection()

        if (range) {
          editor?.insertEmbed(range.index, 'image', url)
        }
      } catch (error) {
        console.log('Error uploading image: ', error)
      }
    }

    input.click()
  }

  const modules = useMemo(
    () => ({
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
          image: imageHandler,
        },
      },
    }),
    [],
  )

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
    'image',
    'strike',
    'code-block',
    'blockquote',
    'align',
    'indent',
  ]

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      value={value ?? ''}
      onChange={onChange}
      className="mb-[50px] font-[Onest,_sans-serif]"
    />
  )
}
