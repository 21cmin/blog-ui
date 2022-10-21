import type { Post } from "$lib/model/Post"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ url, fetch }) => {
  let post: Post | null = null
  const query = url.searchParams.get('edit')
  if (query) {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${query}`, {
        method: 'GET'
      })
      post = await result.json()
    } catch(error) {
      console.log(error);
    }
  }
  return { post }

}