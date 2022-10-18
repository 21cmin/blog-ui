<script lang="ts">
	import { page } from '$app/stores';
	import { fetchUrl } from '$lib/constant/url';
	import type { Post } from '$lib/model/Post';
	import axios from 'axios';
	import { onMount, onDestroy } from 'svelte';
  import type { PageData } from './$types';
  export let data: PageData;
  $: posts = data.posts;
  let pageParam = 0
  let scrollOffset = 1
  
  $: if (scrollOffset == 0) getPage()

  onMount(() => {
    window.addEventListener('scroll', () => {
      scrollOffset = document.body.scrollHeight - window.innerHeight - window.scrollY
    })
  })

  async function getPage() {
    if ($page.url.search) return
    try {
      const result = await axios.get(`${fetchUrl}/post?page=${++pageParam}`)
      const pagePost: Post[] = result.data
      
      if (pagePost.length !== 0) {
        posts = posts.concat(pagePost)
      } else {
        throw new Error("failed to get page post")
      }
    } catch(error) {
      --pageParam
      console.log(error);
    }

  }
  const unsbscribe = page.subscribe((value) => {
    pageParam = 0
  })

  onDestroy(unsbscribe)
  
</script>
<section class="flex flex-col items-center gap-20 mb-10">
  {#each posts as post (post.id)}
  <div class="flex gap-10 flex-row odd:flex-row-reverse card-wrapper w-full">
    <div class="flex-[2] overflow-hidden shadow-xl image-wrapper rounded-lg flex flex-col items-start">
      <img src="{post.imageUrl}" alt="{post.title}" class="object-cover w-full aspect-square">
      <div class="text-lg p-3">
        <p>likes {post.likes.length}</p>
      </div>
    </div>
    <div class="flex-[3] flex flex-col gap-4">
      <a href={`/post/${post.id}`} class="font-semibold text-2xl">
        {post.title}
      </a>
      <p>
        {post.description}
      </p>
    </div>
  </div>
  {/each}
</section>

<style>
  @media (max-width: 630px) {
    .card-wrapper {
      flex-direction: column;
      align-items: center;
    }

    .card-wrapper .image-wrapper {
      max-width: 80%;
    }
  }
</style>