import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';


const Quill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <div>Loading ...</div>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

function QuillComponent() {
  return <Quill modules={modules} formats={formats} theme="snow" placeholder='내용을 입력해주세요.' className='h-128'/>
}

export default QuillComponent