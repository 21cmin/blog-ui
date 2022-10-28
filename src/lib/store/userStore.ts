import { goto } from "$app/navigation";
import type { User, UserAndPassword } from "$lib/model/User";
import axios from "axios";
import { writable, type Writable } from "svelte/store";

const SERVER = import.meta.env.VITE_SERVER

export const appUser: Writable<User | null> = writable(null)

export const registerUser = async (userAndPassword: UserAndPassword) => {
  try {
    await axios.post(`${SERVER}/api/user`, userAndPassword)
  } catch(error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error('이미 존재하는 회원입니다.')
    }
    throw new Error('회원가입에 실패했습니다.')
  }

}

export const login = async (user: UserAndPassword, goToMain: boolean = false): Promise<never | void> => {
  const userForm = new FormData()
  userForm.append("username", user.username)
  userForm.append("password", user.password)
  const result = await axios.post(`${SERVER}/api/user/login`, userForm, {
    withCredentials: true,
  })
  if (result.status !== 200) throw new Error("로그인에 실패하였습니다.")
  const loginUser: User = { username: result.data.username }
  
  appUser.set(loginUser)
  if (goToMain) goto('/')

  localStorage.setItem('user', loginUser.username)
}

export const logout = async () => {
  try {
    appUser.set(null)
    localStorage.removeItem('user')
    await axios.get(`${SERVER}/api/user/logout`)
  } catch(error) {
    console.log(error);
  }
}