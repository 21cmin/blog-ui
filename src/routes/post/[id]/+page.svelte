<script lang="ts">
	import { goto } from '$app/navigation';
  import SideList from '$lib/components/SideList.svelte';
	import { fetchUrl } from '$lib/constant/url';
	import { appUser } from '$lib/store/userStore';
	import axios from 'axios';
	import type { PageData } from './$types';
  export let data: PageData;
	
  $: post = data.post;

	$: time = new Date(post ? post.createdAt : '').toLocaleString()


  async function handleDelete() {
		if (!post?.id) return
		try {
			const result = await axios.delete(`${fetchUrl}/post/${post.id}`)
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
	
	async function handleLike() {
		if (!$appUser || !post) return
		try {
			let url = `${fetchUrl}/post/like`
			if (post.likes.includes($appUser.username)) {
				url = url + '/delete'
			} else {
				url = url + '/create'
			}

			const result = await axios.put(url, {
					username: $appUser.username,
					postId: post.id
			})
 
			if (result.status === 200) {
			 post = result.data
			} else {
				throw new Error('failed to handle like')
			}
		} catch(err) {
			console.log(err);
		}
			
	}

</script>

<section class="flex gap-12 p-4">
	<div class="flex-[5] flex flex-col gap-8">
		<div class="flex flex-col gap-2 items-start">
			<img src={post?.imageUrl} alt={post?.description} class="w-full h-[300px] object-cover" />
			<button class="text-lg text-red-700 px-4" on:click={handleLike}>
				{#if post?.likes.includes($appUser ? $appUser.username : '')}
				<i class="fa-solid fa-heart"></i>
				{:else}
				<i class="fa-regular fa-heart"></i>
				{/if}
				<span>{post ? post.likes.length : 0}</span>
			</button>
		</div>
		<div class="flex items-center gap-5 text-sm">
			{#if post?.imageUrl}
			<img src={post?.imageUrl} alt={post?.description} class="w-12 h-12 rounded-full object-cover" />
			{/if}
			<div>
				<span class="font-bold">{post?.username}</span>
				<p>Posted {time}</p>
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
