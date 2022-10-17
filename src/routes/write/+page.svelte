<script lang="ts">
  import type { Post } from '$lib/model/Post'
	import { appUser } from '$lib/store/userStore'
	import { onDestroy, onMount } from 'svelte';
	import { uploadPost } from '$lib/firebase/firebaseConfig'
	import type { PageData } from './$types'
	import { goto } from '$app/navigation';

	export let data: PageData

	let file: FileList | null = null
	
  let post: Post = {
	  title: "",
	  description: "",
	  imageUrl: "",
	  category: "art",
	  username: "",
	  id: 0,
	  createdAt: '',
		likes: []
  }

	const unsubscribe = appUser.subscribe(value => {
		post.username = value ? value.username : ""
	})

	async function handleUpload() {
		if (!post.username || !post.title || !post.description) {
			console.log("포스트 데이터가 없습니다");
			alert("포스트를 입력하세요")	
		} else {
			try {
				await uploadPost(post, file, data.post ? true : false)
				clearData()
				alert("포스트가 업로드 되었습니다.")
				goto('/')
			} catch(error) {
				console.log(error);
				alert("포스트 업로드에 실패했습니다.")
			}
		}
	}

	function clearData() {
		post.title = ''
		post.description = ''
		post.category = 'art'
		file = null
	}

	onMount(() => {
		if (data.post) {
			post = data.post
		}
	})
	
	onDestroy(unsubscribe)	
</script>

<svelte:head>
	<title>Blog:posting</title>
</svelte:head>

<section class="section">
	<div class="flex flex-col gap-5 basis-9/12 shrink-0 grow-0">
		<input type="text" name="" id="" placeholder="제목을 입력하세요" 
      class="input input-bordered input-primary" 
      bind:value="{post.title}"/>
		<textarea name="" id="" placeholder="내용을 입력하세요"
      class="textarea textarea-primary h-full overflow-scroll min-h-[200px]" 
      bind:value="{post.description}" />
	</div>
	<div class="right-aside">
		<div class="item" >
			<h1>Publish</h1>
			<span>
				<b>Status: </b> Draft
			</span>
			<span>
				<b>Visibility: </b> Public
			</span>
			<input type="file" name="" id="file" class="hidden" bind:files="{file}"
        accept="image/png, image/jpeg, image/jpg"/>
      <p class="overflow-hidden h-4">{file ? file[0].name : post.imageUrl}</p>
			<label for="file" class="btn btn-sm btn-primary btn-outline">이미지 선택하기</label>
			<button class="btn btn-sm btn-primary" 
				on:click={handleUpload}>
				{data.post ? '수정하기' : '업로드'}
			</button>
		</div>
		<div class="item">
			<h1>Category</h1>
			<div class="cat">
				<input type="radio" name="cat" id="art" value="art" bind:group="{post.category}" 
          class="radio radio-primary"/>
				<label for="art">Art</label>
			</div>
			<div class="cat">
				<input type="radio" name="cat" id="science" value="science" bind:group="{post.category}"
        class="radio radio-primary"/>
				<label for="science">Science</label>
			</div>
			<div class="cat">
				<input type="radio" name="cat" id="technology" value="technology" bind:group="{post.category}"
        class="radio radio-primary"/>
				<label for="technology">Technology</label>
			</div>
			<div class="cat">
				<input type="radio" name="cat" id="cinema" value="cinema" bind:group="{post.category}"
        class="radio radio-primary"/>
				<label for="cinema">Cinema</label>
			</div>
			<div class="cat">
				<input type="radio" name="cat" id="design" value="design" bind:group="{post.category}"
        class="radio radio-primary"/>
				<label for="design">Design</label>
			</div>
			<div class="cat">
				<input type="radio" name="cat" id="foot" value="foot" bind:group="{post.category}"
        class="radio radio-primary"/>
				<label for="foot">Food</label>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		display: flex;
		padding: 16px;
		gap: 20px;
	}

	.right-aside {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex-basis: 23%;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.item {
		border: 1px solid indigo;
    border-radius: 0.5rem;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 12px;
		color: #555;
    gap: 0.8rem;
	}

	.item h1 {
		font-size: 20px;
	}

	.cat {
		display: flex;
		align-items: center;
    gap: 8px;
		color: teal;
	}

  .cat label {
    font-size: small;
    cursor: pointer;
    color: indigo;
  }

	@media (max-width: 600px) {
		.section {
			flex-direction: column;
		}

		.right-aside {
			flex-direction: column-reverse;
		}
	}
</style>
