import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';
import { fetchUrl } from '$lib/constant/url';

export const load: PageLoad = async ({ params, fetch }) => {
  let post: Post | null = null
  let posts: Post[] = []
  try {
    let result = await fetch(`${fetchUrl}/post/${params.id}`, {
      method: 'GET'
    })
    if (result.ok) {
      post = await result.json()
    }

    result = await fetch(`${fetchUrl}/post/category?cat=${post?.category}`)
    if (result.ok) {
      posts = await result.json()
    }

  } catch(error) {
    console.log(error);
  }
  return { post, posts }
}