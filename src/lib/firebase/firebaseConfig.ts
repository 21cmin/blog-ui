import type { Post } from "$lib/model/Post";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA1u5z_kThWjef2rNb_LsFCpEtNx5HB_bg",
  authDomain: "blog-2e8d6.firebaseapp.com",
  projectId: "blog-2e8d6",
  storageBucket: "blog-2e8d6.appspot.com",
  messagingSenderId: "441624712300",
  appId: "1:441624712300:web:d69ac53f1b40f602e4b449"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export const uploadPost = async (post: Post, file: FileList | null): Promise<never | void> => {
  if (file && file[0]) {
    const selectedFile = file[0]
    const imgRef = ref(storage, `${post.username}/${selectedFile.name}`)
    console.log(imgRef.fullPath);
    
    const snapshot = await uploadBytes(imgRef, selectedFile)
    post.imageUrl = await makeImageUrl(snapshot.ref.fullPath)
  }
  console.log(post);
  

  const result = await axios.post('/api/post/upload', post)
  console.log(result.data);
  
}

export const makeImageUrl = async (url:string) => {
  const result = await getDownloadURL(ref(storage, url)) 
  return result
}
