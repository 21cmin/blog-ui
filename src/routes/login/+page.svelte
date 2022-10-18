<script lang="ts">
	import { goto } from "$app/navigation";
	import type { UserAndPassword } from "$lib/model/User";
	import { login } from "$lib/store/userStore";
	import axios from "axios";

  let user: UserAndPassword = {
    username: "",
    password: ""
  }
  let errorMessage = ""

  async function handleSubmit() {
    try {
      await login(user, true)
    } catch(err) {
      if (axios.isAxiosError(err)) console.log(err);
      errorMessage = '로그인에 실패하였습니다.'
    }
  }

</script>

<div class="flex flex-col items-center">
  <form action="" class="flex flex-col mt-8 p-5 shadow border min-w-[320px] rounded-md"
    on:submit|preventDefault={handleSubmit}>
    <h2 class="text-center font-semibold text-2xl mb-4">로그인</h2>
    <div class="flex flex-col gap-5">
      <div class="flex justify-between gap-4 items-center">
        <label for="username" class="min-w-fit text-sm">아이디</label>
        <input type="text" required name="username" id="username" placeholder="아이디를 입력하세요" 
          class="input input-sm input-bordered input-primary w-full max-w-[190px]"
          minlength="3"
          bind:value={user.username}>
      </div>
      <div class="flex justify-between gap-4 items-center">
        <label for="password" class="min-w-fit text-sm">비밀번호</label>
        <input type="password" required name="password" id="password" placeholder="비밀번호를 입력하세요" 
          class="input input-sm input-bordered input-primary w-full max-w-[190px]"
          minlength="4"
          bind:value={user.password}>
      </div>
      <p class="text-sm font-light text-center text-red-500">{errorMessage}</p>
      <button type="submit" class="btn btn-primary tracking-widest">로그인</button>
      <div class="flex gap-2 items-center">
        <span class="font-thin text-sm">아이디가 없으세요?</span>
        <a href="/register" class="text-blue-600">가입하기</a>
      </div>
    </div>
  </form>
</div>