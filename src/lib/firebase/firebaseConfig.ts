import type { Post } from "$lib/model/Post";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage'

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
    const snapshot = await uploadBytes(imgRef, selectedFile)
    post.imageUrl = snapshot.ref.fullPath
  }
}