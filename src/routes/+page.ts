import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';
export const load: PageLoad = async ({ fetch, url }) => {
  let posts: Post[] = []
  const query = url.searchParams.get('cat')
  try {
    const url = `/api/post${query ? '/?cat=' + query : ""}`
    console.log(url);
    
    const result = await fetch(url, {
      method: 'get'
    })
    if (result.ok) {
      posts = await result.json()
    }
  } catch(err) {
    console.log(err);
  }
  return {
    posts
  }
}