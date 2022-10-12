<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  $: posts = data.posts;
</script>
<section class="flex flex-col items-center gap-20 mb-10">
  {#each posts as post (post.id)}
  <div class="flex gap-10 flex-row odd:flex-row-reverse">
    <div class="flex-[2] rounded overflow-hidden shadow-xl">
      <img src="{post.img}" alt="{post.title}" class="object-cover w-full aspect-square">
    </div>
    <div class="flex-[3] flex flex-col gap-4">
      <a href={`/post/${post.id}`} class="font-semibold text-2xl">
        {post.title}
      </a>
      <p>
        {post.desc}
      </p>
    </div>
  </div>
  {/each}
</section>
