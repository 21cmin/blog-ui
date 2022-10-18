import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';

export const load: PageLoad = async ({ params, fetch }) => {
  let post: Post | null = null
  let posts: Post[] = []
  try {
<<<<<<< HEAD
    let result = await fetch(`/api/post/${params.id}`, {
      method: 'GET'
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
    result = await fetch(`/api/post/category?cat=${post?.category}`)
=======
    result = await fetch(`${fetchUrl}/post/category?cat=${post?.category}`, {
      method: 'GET',
      mode: 'no-cors'
    })
>>>>>>> parent of 297768e... Revert "cors"
    if (result.ok) {
      posts = await result.json()
    }

  } catch(error) {
    console.log(error);
  }
  return { post, posts }
}