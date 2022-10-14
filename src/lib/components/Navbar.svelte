 <script lang="ts">
import { appUser, logout } from '$lib/store/userStore'

let hamburger: HTMLDivElement
let menuList: HTMLUListElement
let showMenu = false

function handleMenuClick() {
  showMenu = !showMenu
}

 </script>

 <nav class="border-b bg-white">
  <div class="container">
    <a href="/" class="text-2xl font-bold text-stone-500 tracking-wide">Blog</a>
    <div class="flex items-center gap-8">
      <ul class="menu-list" class:active="{showMenu}" bind:this={menuList}>
        <li>
          <a href="/" class="uppercase">
            <i class="fa-solid fa-compass"></i>
            <span class="menu-text">전체보기</span>
          </a>
        </li>
        <li>
          <a href="/?cat=art">
            <i class="fa-sharp fa-solid fa-palette"></i>
            <span class="menu-text">예술</span>
            
          </a>
        </li>
        <li>
          <a href="/?cat=science">
            <i class="fa-solid fa-flask"></i>
            <span class="menu-text">과학</span>
            
          </a>
        </li>
        <li>
          <a href="/?cat=technology">
            <i class="fa-solid fa-microchip"></i>
            <span class="menu-text">기술</span>
          </a>
        </li>
        <li>
          <a href="/?cat=cinema">
            <i class="fa-solid fa-film"></i>
            <span class="menu-text">영화</span>
            
          </a>
        </li>
        <li>
          <a href="/?cat=design">
            <i class="fa-solid fa-ruler-combined"></i>
            <span class="menu-text">디자인</span>
            
          </a>
        </li>
        <li>
          <a href="?cat=food">
            <i class="fa-solid fa-bowl-food"></i>
            <span class="menu-text">음식</span>
          </a>
        </li>
      </ul>
      <div class="flex gap-5 items-center justify-between">
        <a href={$appUser ? '/write' : '/login'} 
          class="flex items-center gap-1 btn btn-sm btn-outline btn-secondary hover:btn-active">
          <i class="fa-solid fa-pen"></i>
          <span class="">포스팅</span>
        </a>
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
      <div class="hamburger" class:active="{showMenu}" bind:this={hamburger} on:click={handleMenuClick}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </div>
 </nav>

 <style>
  .container {
    max-width: 1024px;    
    margin: 0 auto;
    padding: 12px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

   .menu-list {
    display: flex;
    gap: 20px;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.025em;
    transition: .5s;
   }

   .hamburger {
    display: none;
    cursor: pointer;
    z-index: 20;
    transition: all 0.3s ease-in-out;
   }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: darkslategray;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
  }

  @media (max-width: 900px) {
    .menu-text {
      display: none;
    }
  }

  @media (max-width: 570px) {
    .menu-list {
      display: none;
      justify-content: space-between;
      padding: 15px;
      background-color: white;
      border-bottom: 1px solid gray;
      z-index: 10;
    }

    .menu-list.active {
      display: flex;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
    }

    .hamburger {
      display: block;
      margin-right: 15px;
      z-index: 20;
    }

    .hamburger.active {
      transform: rotate(180deg);
    }
    
    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    } 

    .hamburger.active .bar:nth-child(1) {
      transform: rotate(45deg) translate(5px, 6px);

    } 

    .hamburger.active .bar:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -6px);
    } 
  }

 </style>