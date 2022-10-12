 <script lang="ts">
import { appUser, logout } from '$lib/store/userStore'
 </script>

 <nav class="border-b bg-white">
  <div class="max-w-5xl mx-auto px-2 py-3 flex flex-row items-center justify-between">
    <a href="/" class="text-2xl font-bold text-stone-500 tracking-wide">Blog</a>
    <ul class="flex flex-row gap-5 font-light text-lg tracking-wider">
      <li>
        <a href="/" class="uppercase">
          <i class="fa-solid fa-compass"></i>
          전체보기
        </a>
      </li>
      <li>
        <a href="?cat=art" class="uppercase">
          <i class="fa-sharp fa-solid fa-palette"></i>
          예술
        </a>
      </li>
      <li>
        <a href="?cat=science" class="uppercase">
          <i class="fa-solid fa-flask"></i>
          과학
        </a>
      </li>
      <li>
        <a href="?cat=technology" class="uppercase">
          <i class="fa-solid fa-microchip"></i>
          기술
        </a>
      </li>
      <li>
        <a href="?cat=cinema" class="uppercase">
          <i class="fa-solid fa-film"></i>
          영화
        </a>
      </li>
      <li>
        <a href="?cat=design" class="uppercase">
          <i class="fa-solid fa-ruler-combined"></i>
          디자인
        </a>
      </li>
      <li>
        <a href="?cat=food" class="uppercase">
          <i class="fa-solid fa-bowl-food"></i>
          음식
        </a>
      </li>
    </ul>
    {#if $appUser}
    <button class="btn btn-primary btn-sm" on:click={logout}>
      로그아웃
    </button>
    {:else} 
    <a href="/login" class="btn btn-primary btn-sm">
      로그인
    </a>
    {/if}
  </div>
 </nav>