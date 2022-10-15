<script lang="ts">
	import type { Post } from "$lib/model/Post";
  export let posts: Post[]
</script>
<aside class="flex-[2] md:block hidden">
  <h1 class="text-[18px] text-gray-700 text-center mb-2">좋아할 만한 포스트</h1>
  <div class="flex flex-col gap-7">
    {#each posts as post (post.id)}
      <div class="flex flex-col gap-1">
        <img src={post.imageUrl} alt={post.title} class="w-full h-[200px] object-cover rounded" />
        <h2 class="text-gray-700 text-sm">{post.title}</h2>
        <a href="{`/post/${post.id}`}"
          class="btn btn-sm btn-outline tracking-wider">
          살펴보기
        </a>
      </div>
    {/each}
  </div>
</aside>