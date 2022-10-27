<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
	import { onMount } from "svelte";
  import { appUser } from "$lib/store/userStore";
  import "../app.css"

onMount(() => {
  const user = localStorage.getItem('user')
  if (user) {
    appUser.set({ username: user })
  }
})

</script>
<div class="flex min-h-screen flex-col">
  <div class="fixed top-0 left-0 right-0 z-10">
    <Navbar />
  </div>
  <main class="max-w-5xl mx-auto w-screen p-2 flex-1 mt-24">
    <slot />
  </main>
  <Footer />
</div>