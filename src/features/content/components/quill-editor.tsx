import { useMemo, useRef, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'

import { uploadImage } from '../api'

import { useImageCompression } from '@/hooks/use-image-compression'
import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null)
  const { compress } = useImageCompression(true)
  const [cleanValue, setCleanValue] = useState<string>('')
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (value === undefined || value === null) {
      setCleanValue('')
      return
    }

    let cleaned = value

    try {
      if (typeof cleaned === 'string') {
        while (cleaned.startsWith('"') || cleaned.startsWith('{"')) {
          try {
            const parsed = JSON.parse(cleaned)
            if (typeof parsed === 'string') {
              cleaned = parsed
            } else {
              break
            }
          } catch {
            break
          }
        }
      }
    } catch (e) {
      console.warn('QuillEditor: Content parsing warning:', e)
    }

    if (typeof cleaned !== 'string') {
      cleaned = String(cleaned)
    }

    if (
      cleaned.includes('&amp;') ||
      cleaned.includes('&lt;') ||
      cleaned.includes('&gt;')
    ) {
      const textarea = document.createElement('textarea')
      textarea.innerHTML = cleaned
      cleaned = textarea.value
    }

    if (cleaned !== cleanValue) {
      setCleanValue(cleaned)
    }
  }, [value])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    }
  }, [])

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

        const url = await uploadHandler(compressed.compressedFile)

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

  const handleChange = (content: string) => {
    let cleaned = content

    try {
      if (typeof cleaned === 'string' && cleaned.startsWith('"')) {
        cleaned = JSON.parse(cleaned)
      }
    } catch {
      //
    }

    setCleanValue(cleaned)
    onChange?.(cleaned)
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
      value={cleanValue}
      onChange={handleChange}
      className="mb-[50px] font-[Onest,_sans-serif]"
    />
  )
}
