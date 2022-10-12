import type { PageLoad } from './$types';
import { posts } from "$lib/data/posts";
export const load: PageLoad = () => {
  return {
    posts,
  }
}