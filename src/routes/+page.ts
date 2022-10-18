import type { PageLoad } from './$types';
import type { Post } from '$lib/model/Post';
import { fetchUrl } from '$lib/constant/url';
export const load: PageLoad = async ({ fetch, url }) => {
  let posts: Post[] = []
  const category = url.searchParams.get('cat')
  
  try {
    const url = `${fetchUrl}/post` + (category ? `/category?cat=${category}` : '?page=0')
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