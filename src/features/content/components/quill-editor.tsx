import { useMemo, useRef } from 'react'
import ReactQuill from 'react-quill'

import { uploadImage } from '../api'

import { useImageCompression } from '@/hooks/use-image-compression'
import imageCompression from 'browser-image-compression'
import 'react-quill/dist/quill.snow.css'
import { useMemo, useRef } from 'react'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
  maxSizeMB?: number // Max file size in MB (default: 1)
  maxWidthOrHeight?: number // Max width or height in pixels (default: 1920)
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
export default function QuillEditor({ 
  value, 
  onChange,
  maxSizeMB = 1,
  maxWidthOrHeight = 1920 
}: QuillEditorProps) {
  const quillRef = useRef<ReactQuill>(null)

  // Custom image handler with compression
  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      try {
        // Compression options
        const options = {
          maxSizeMB,
          maxWidthOrHeight,
          useWebWorker: true,
          fileType: 'image/webp', // Convert to WebP
          initialQuality: 0.8, // Initial quality (0.1 to 1)
        }

        // Compress the image
        const compressedFile = await imageCompression(file, options)
        
        // Convert to base64 for embedding in the editor
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          
          // Get the Quill editor instance
          const quill = quillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', base64, 'user')
            quill.setSelection(range.index + 1, 0)
          }
        }
        reader.readAsDataURL(compressedFile)
        
        // Optional: Log compression results
        console.log('Original file size:', (file.size / 1024 / 1024).toFixed(2), 'MB')
        console.log('Compressed file size:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB')
        console.log('Compression ratio:', ((1 - compressedFile.size / file.size) * 100).toFixed(1), '%')
        
      } catch (error) {
        console.error('Error compressing image:', error)
        alert('Failed to compress image. Please try a different image.')
      }
    }
  }

  // Custom modules with image handler
  const modules = useMemo(() => ({
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
  }), [maxSizeMB, maxWidthOrHeight])

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