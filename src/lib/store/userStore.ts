import { goto } from "$app/navigation";
import type { User, UserAndPassword } from "$lib/model/User";
import axios from "axios";
import { writable, type Writable } from "svelte/store";

export const appUser: Writable<User | null> = writable(null)

export const login = async (user: UserAndPassword, goToMain: boolean = false): Promise<never | void> => {
  const userForm = new FormData()
  userForm.append("username", user.username)
  userForm.append("password", user.password)
  const result = await axios.post("/api/login", userForm)
  if (result.status !== 200) throw new Error("login failed")
  const loginUser: User = { username: result.data }
  appUser.set(loginUser)
  if (goToMain) goto('/')
}

export const logout = () => {
  let date = new Date(99, 1)
  document.cookie = `refresh_token=; expires=${date};`
  document.cookie = `haha=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`
}

export const verifyUser = async () => {
  try {
    const result = await axios.get('/api/user/verify')
    console.log(result.data);
  } catch(err) {
    console.log(err);
  }
}