import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';

export const load: PageLoad = async ({ params, fetch }) => {
  let post: Post | null = null
  let posts: Post[] = []
  try {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    let result = await fetch(`/api/post/${params.id}`, {
      method: 'GET'
=======
    let result = await fetch(`${fetchUrl}/post/${params.id}`, {
      method: 'GET',
      mode: 'no-cors'
>>>>>>> parent of 297768e... Revert "cors"
=======
    let result = await fetch(`${fetchUrl}/post/${params.id}`, {
      method: 'GET',
      mode: 'no-cors'
>>>>>>> parent of 297768e... Revert "cors"
=======
    let result = await fetch(`${fetchUrl}/post/${params.id}`, {
      method: 'GET',
      mode: 'no-cors'
>>>>>>> parent of 297768e... Revert "cors"
    })
    if (result.ok) {
      post = await result.json()
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    result = await fetch(`/api/post/category?cat=${post?.category}`)
=======
=======
>>>>>>> parent of 297768e... Revert "cors"
=======
>>>>>>> parent of 297768e... Revert "cors"
    result = await fetch(`${fetchUrl}/post/category?cat=${post?.category}`, {
      method: 'GET',
      mode: 'no-cors'
    })
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 297768e... Revert "cors"
=======
>>>>>>> parent of 297768e... Revert "cors"
=======
>>>>>>> parent of 297768e... Revert "cors"
    if (result.ok) {
      posts = await result.json()
    }

  } catch(error) {
    console.log(error);
  }
  return { post, posts }
}