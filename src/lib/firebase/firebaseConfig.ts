import { useAxiosPrivate } from "$lib/axios";
import type { Post } from "$lib/model/Post";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export const uploadPost = async (post: Post, file: FileList | null, update: boolean, accessKey: string): Promise<never | void> => {
  if (file && file[0]) {
    const selectedFile = file[0]
    const imgRef = ref(storage, `${post.username}/${selectedFile.name}`)
    console.log(imgRef.fullPath);
    
    const snapshot = await uploadBytes(imgRef, selectedFile)
    post.imageUrl = await makeImageUrl(snapshot.ref.fullPath)
  }
  console.log(post);
  
  const axiosPriavate = useAxiosPrivate()
  if (update) {
    const result = await axiosPriavate.put(`/api/post`, post)
    console.log(result.data);
  } else {
    const result = await axiosPriavate.post(`/api/post`, post)
    console.log(result.data);
  }
  
}

export const makeImageUrl = async (url:string) => {
  const result = await getDownloadURL(ref(storage, url)) 
  return result
}
