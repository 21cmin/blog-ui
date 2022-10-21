import { goto } from "$app/navigation";
import type { User, UserAndPassword } from "$lib/model/User";
import axios from "axios";
import { writable, type Writable } from "svelte/store";

export const appUser: Writable<User | null> = writable(null)

export const login = async (user: UserAndPassword, goToMain: boolean = false): Promise<never | void> => {
  const userForm = new FormData()
  userForm.append("username", user.username)
  userForm.append("password", user.password)
  const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, userForm)
  if (result.status !== 200) throw new Error("login failed")
  const loginUser: User = { username: result.data.username }
  
  appUser.set(loginUser)
  if (goToMain) goto('/')
}

export const logout = async () => {
  try {
    appUser.set(null)
    await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`)
  } catch(error) {
    console.log(error);
  }
}

export const verifyUser = async () => {
  try {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/verify`)
    console.log(result.data);
  } catch(err) {
    console.log(err);
  }
}