import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps {
  value?: string
  onChange?: (value: string) => void
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '+1' }, { indent: '-1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }

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
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
      className="mb-[50px] font-[Onest,_sans-serif]"
    />
  )
}
