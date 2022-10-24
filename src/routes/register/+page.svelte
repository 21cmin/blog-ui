<script lang="ts">
  import { login, registerUser } from '$lib/store/userStore'
	import type { UserAndPassword } from '$lib/model/User';

  let user: UserAndPassword = {
    username: "",
    password: ""
  }
  let passwordConfirm: string
  let errorMessage = ""

  async function handleSubmit() {
    if (user.password !== passwordConfirm) return
    try {
      await registerUser(user)
      await login(user, true)
    } catch(error) {
      if (error instanceof Error) {
        errorMessage = error.message
      } else {
        errorMessage = '회원가입에 실패하였습니다.'
      }
    }
  }

</script>

<div class="flex flex-col items-center">
  <form action="" class="flex flex-col mt-8 p-5 shadow border min-w-[320px] rounded-md"
    on:submit|preventDefault={handleSubmit}>
    <h2 class="text-center font-semibold text-2xl mb-4">회원가입</h2>
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
      <div class="flex justify-between gap-4 items-center">
        <label for="password" class="min-w-fit text-sm">비밀번호확인</label>
        <input type="password" required name="password" id="password-confirm" placeholder="비밀번호를 입력하세요" 
          class="input input-sm input-bordered input-primary w-full max-w-[190px]"
          minlength="4"
          bind:value={passwordConfirm}>
      </div>
      <p class="text-sm font-light text-center text-red-500">{errorMessage}</p>
      <button type="submit" class="btn btn-primary tracking-widest">회원가입</button>
      <div class="flex gap-2 items-center">
        <span class="font-thin text-sm">아이디가 있으신가요?</span>
        <a href="/login" class="text-blue-600">로그인</a>
      </div>
    </div>
  </form>
</div>
