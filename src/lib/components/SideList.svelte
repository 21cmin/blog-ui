<script lang="ts">
  import { posts } from "$lib/data/posts";

</script>
<aside class="flex-[2]">
  <h1 class="text-[18px] text-gray-700 text-center mb-2">좋아할 만한 포스트</h1>
  <div class="flex flex-col gap-7">
    {#each posts as post (post.id)}
      <div class="flex flex-col gap-1">
        <img src={post.img} alt={post.title} class="w-full h-[200px] object-cover rounded" />
        <h2 class="text-gray-700 text-sm">{post.title}</h2>
        <button class="btn btn-sm btn-outline tracking-wider">살펴보기</button>
      </div>
    {/each}
  </div>
</aside>