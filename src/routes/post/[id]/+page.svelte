<script lang="ts">
	import { goto } from '$app/navigation';
  import SideList from '$lib/components/SideList.svelte';
	import { appUser } from '$lib/store/userStore';
	import axios from 'axios';
	import type { PageData } from './$types';
  export let data: PageData;
	
  $: post = data.post;


  async function handleDelete() {
		if (!post?.id) return
		try {
			const result = await axios.delete(`/api/post/${post.id}`)
			if (result.status === 202) {
				alert("post is deleted successfully")
				goto('/')
			} else {
				throw new Error('failed to delete post')
			}
		} catch(error) {
			console.log(error);
		}
	}

</script>

<section class="flex gap-12 p-4">
	<div class="flex-[5] flex flex-col gap-8">
		<img src={post?.imageUrl} alt={post?.description} class="w-full h-[300px] object-cover" />
		<div class="flex items-center gap-5 text-sm">
			{#if post?.imageUrl}
			<img src={post?.imageUrl} alt={post?.description} class="w-12 h-12 rounded-full object-cover" />
			{/if}
			<div>
				<span class="font-bold">{post?.username}</span>
				<p>Posted {post?.createdAt}</p>
			</div>
			{#if $appUser?.username === post?.username}
			<div class="flex gap-2">
				<a href={`/write?edit=${post?.id}`} class="btn btn-sm btn-outline">Edit</a>
				<button class="btn btn-sm btn-error text-white"
					on:click={handleDelete}>
					Delete
				</button>
			</div>
			{/if}
		</div>
		<h1 class="font-bold text-2xl">
			{post?.title}
		</h1>
		<p class="text-justify leading-8">
			{post?.description}
		</p>
	</div>
	<!-- Side List -->
	<SideList posts={data.posts}/>
</section>
