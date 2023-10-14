import * as firebase from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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

export const uploadImageToFirebase = async (file: any, fileName: any) => {
  const storageRef = ref(storage, `image/${fileName}`);

  try {
    await uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("파이어베이스에 이미지가 성공적으로 업로드되었습니다. URL:", url);
      });
    });
  } catch (error) {
    console.log(error);
  }
};