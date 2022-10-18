import type { Post } from "$lib/model/Post"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ url, fetch }) => {
  let post: Post | null = null
  const query = url.searchParams.get('edit')
  if (query) {
    try {
<<<<<<< HEAD
      const result = await fetch(`/api/post/${query}`, {
        method: 'GET'
=======
      const result = await fetch(`${fetchUrl}/post/${query}`, {
        method: 'GET',
        mode: 'no-cors'
>>>>>>> parent of 297768e... Revert "cors"
      })
      post = await result.json()
    } catch(error) {
      console.log(error);
    }
  }
  return { post }

}