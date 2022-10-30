import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { refresh } from "$lib/store/userStore";
import { appUser } from "$lib/store/userStore";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_SERVER
})

const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_SERVER,
    withCredentials: true,
})

interface MyAxiosConfig extends AxiosRequestConfig {
    sent: boolean
}

const useAxiosPrivate = () => {
    let key: string
    appUser.subscribe(user => key = user ? user.accessKey : "")
    const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            if (config.headers) {
                config.headers['Authorization'] = `Bearer ${key}`
                config.headers['Content-Type'] = 'application/json'
                console.log(`before: ${key}`);
                
            }
            return config
        },
        (error: AxiosError) => {
            console.log(error.message);
            return Promise.reject(error)
        }
    )
    const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const prevConfig = error.config as MyAxiosConfig
            if (error.response?.status === 403 && prevConfig && prevConfig.headers && !prevConfig.sent) {
                prevConfig.sent = true
                const accessToken = await refresh()
                prevConfig.headers['Authorization'] = `Bearer ${accessToken}`
                console.log(`refresh!!!! ${accessToken}`);
                console.log('prev headers', prevConfig.headers);
                
                
                return axiosPrivate(prevConfig)
            }
            console.log(error.message);
            return Promise.reject(error)
        }
    )
    return axiosPrivate
}


export { axiosPublic, axiosPrivate, useAxiosPrivate }
