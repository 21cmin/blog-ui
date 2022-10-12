import type { PageLoad } from './$types';
import { posts } from '$lib/data/posts';

export const load: PageLoad = ({ params }) => {
  const post = posts.find(post => post.id === parseInt(params.id))
  return { post }
}