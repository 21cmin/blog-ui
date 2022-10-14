<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  $: posts = data.posts;
  
</script>
<section class="flex flex-col items-center gap-20 mb-10">
  {#each posts as post (post.id)}
  <div class="flex gap-10 flex-row odd:flex-row-reverse card-wrapper w-full">
    <div class="flex-[2] overflow-hidden shadow-xl image-wrapper rounded-lg">
      <img src="{post.imageUrl}" alt="{post.title}" class="object-cover w-full aspect-square">
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