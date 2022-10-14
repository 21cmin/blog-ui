import { appUser } from '$lib/store/userStore'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch }) => {
  try {
    const result = await fetch('/api/user/verify', {
      method: 'GET',
    })
    if (result.status === 200) {
      const name = await result.text()
      appUser.set({ username: name })
      console.log(`user: ${name}`);
    } 
  } catch(err) {
    console.log(err);
    console.log('verify failed');
  }
}