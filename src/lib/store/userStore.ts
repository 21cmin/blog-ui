import { goto } from "$app/navigation";
import type { User, UserAndPassword } from "$lib/model/User";
import axios from "axios";
import { writable, type Writable } from "svelte/store";

export const appUser: Writable<User | null> = writable(null)

export const registerUser = async (userAndPassword: UserAndPassword): Promise<never | void> => {
  const result = await axios.post('/api/user', userAndPassword)
  if (result.status === 201) {
    return result.data
  } else if (result.status === 400) {
    throw new Error('이미 존재하는 회원입니다.')
  } else {
    throw new Error('회원 가입에 실패하였습니다.')
  }
}

export const login = async (user: UserAndPassword, goToMain: boolean = false): Promise<never | void> => {
  const userForm = new FormData()
  userForm.append("username", user.username)
  userForm.append("password", user.password)
  const result = await axios.post(`/api/login`, userForm)
  if (result.status !== 200) throw new Error("로그인에 실패하였습니다.")
  const loginUser: User = { username: result.data.username }
  
  appUser.set(loginUser)
  if (goToMain) goto('/')
}

export const logout = async () => {
  try {
    appUser.set(null)
    await axios.get(`/api/user/logout`)
  } catch(error) {
    console.log(error);
  }
}

export const verifyUser = async () => {
  try {
    const result = await axios.get(`/api/user/verify`)
  } catch(err) {
    console.log(err);
  }
}