import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';

export const load: PageLoad = async ({ params, fetch }) => {
  let post: Post | null = null
  try {
    const result = await fetch(`/api/post/${params.id}`, {
      method: 'GET'
    })
    if (result.ok) {
      post = await result.json()
      console.log(post);
      console.log(post?.createdAt);
      
    }
  } catch(error) {
    console.log(error);
  }
  return {
    post
  }
}