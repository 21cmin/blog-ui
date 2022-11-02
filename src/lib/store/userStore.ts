import { goto } from "$app/navigation";
import { axiosPrivate, axiosPublic } from "$lib/axios";
import type { User, UserAndPassword } from "$lib/model/User";
import axios from "axios";
import { writable, type Writable } from "svelte/store";

export const appUser: Writable<User | null> = writable(null)

export const registerUser = async (userAndPassword: UserAndPassword) => {
  try {
    await axiosPublic.post(`/api/user`, userAndPassword)
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
  const result = await axiosPrivate.post(`/api/user/login`, userForm, {
    withCredentials: true,
  })
  if (result.status !== 200) throw new Error("로그인에 실패하였습니다.")
    const loginUser: User = {
    username: result.data.username,
    accessKey: result.data.access_token
  }
  
  appUser.set(loginUser)
  if (goToMain) goto('/')

  localStorage.setItem('user', loginUser.username)
}

export const logout = async () => {
  try {
    appUser.set(null)
    localStorage.removeItem('user')
    await axiosPublic.get(`/api/user/logout`)
  } catch(error) {
    console.log(error);
  }
}

export const refresh = async () => {
  const result = await axiosPublic.get(`/api/user/refresh`, {
    withCredentials: true
  })
  if (result.status !== 200) throw new Error('filed to get authentication')
  appUser.update(user => {
    if (user) {
      user = {...user, accessKey: result.data.access_token}
      return user
    }
    return null
  })
  
  return result.data.access_token
}