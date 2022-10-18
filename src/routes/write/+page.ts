import { fetchUrl } from "$lib/constant/url"
import type { Post } from "$lib/model/Post"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ url, fetch }) => {
  let post: Post | null = null
  const query = url.searchParams.get('edit')
  if (query) {
    try {
      const result = await fetch(`${fetchUrl}/post/${query}`, {
        method: 'GET'
      })
      post = await result.json()
    } catch(error) {
      console.log(error);
    }
  }
  return { post }

}