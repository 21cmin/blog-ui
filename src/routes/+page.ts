import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';
export const load: PageLoad = async ({ fetch, url }) => {
  let posts: Post[] = []
  const category = url.searchParams.get('cat')
  
  try {
    const url = `${import.meta.env.VITE_SERVER}/api/post` + (category ? `/category?cat=${category}` : '/page?page=0')
    
    const result = await fetch(url, {
      method: 'get',
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