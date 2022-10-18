import { fetchUrl } from '$lib/constant/url'
import { appUser } from '$lib/store/userStore'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch }) => {
  try {
    const result = await fetch(`${fetchUrl}/user/verify`, {
      method: 'GET',
      mode: 'no-cors'
    })
    if (result.status === 200) {
      const name = await result.text()
      appUser.set(name ? { username : name} : null)
      console.log(`user: ${name}`);
    } else if (result.status === 403) {
      console.log('send refresh token');
      const result = await fetch(`${fetchUrl}/user/refresh`, {
        method: 'GET'
      })
      if (result.status === 200) {
        const name = await result.text()
        appUser.set(name ? { username : name} : null)
        console.log(`user: ${name}`);
      }
    }
    
  } catch(err) {
    console.log(err);
    console.log('verify failed');
  }
}
