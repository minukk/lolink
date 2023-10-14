import dynamic from 'next/dynamic'
import { RefObject, useMemo, useRef } from 'react'
import 'react-quill/dist/quill.snow.css';
import Loading from '../atoms/Loading';
import * as firebase from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { useRouter } from 'next/router';
import { resizeAndConvertImage } from '@/utils/imageResize';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};


firebase.initializeApp(firebaseConfig);
const storage = getStorage();


interface IQuill extends ReactQuillProps {
  forwardedRef: RefObject<ReactQuill>;
}

const Quill = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill')
    const CustomQuill = ({ forwardedRef, ...props }: IQuill) => (
      <ReactQuill ref={forwardedRef} {...props} />
    )
    return CustomQuill;
  },
  {
    ssr: false,
    loading: () => <Loading />,
  }
)

function QuillComponent({ content, setContent }: any) {
  const router = useRouter();
  const quillRef: any = useRef(null);
  let fileName;

  const imageHandler = () => {
    if (!quillRef.current) {
      console.error("ReactQuill이 아직 초기화되지 않았습니다.");
      return;
    }
    
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      fileName = Date.now() + file.size;

      try {
        const resizedImage: any = await resizeAndConvertImage(file);

        const storageRef = ref(
          storage,
          `posts/${fileName}`
        );
        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, resizedImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);
            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const isPost = useMemo(() => (router.pathname.includes('/posts') ? ['link', 'image'] : []), [router.pathname]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        isPost,
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      }
    }
  }), []);

  

  return <Quill forwardedRef={quillRef} modules={modules} formats={FORMATS} theme="snow" placeholder='내용을 입력해주세요.' className='h-128' onChange={setContent} value={content}/>
}

const FORMATS = [
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

export default QuillComponent