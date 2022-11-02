import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { refresh } from "$lib/store/userStore";

interface MyAxiosConfig extends AxiosRequestConfig {
    sent: boolean
}

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

const useAxiosPrivate = (accessToken: string) => {
    axiosPrivate.interceptors.request.use(
        (config) => {
            if (!config.headers) throw new Error('no request headers')
            if (!config.headers['Authorization']) {
                config.headers = {
                    ...config.headers,
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            return config as MyAxiosConfig
        },
        (error: AxiosError) => {
            return Promise.reject(error) 
       }
    )
    axiosPrivate.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const prevConfig = error.config as MyAxiosConfig
            
            if (error.response?.status === 403 && prevConfig && prevConfig.headers && !prevConfig.sent) {
                prevConfig.sent = true
                const newToken = await refresh()
                prevConfig.headers = {
                    ...prevConfig.headers,
                    'Authorization': `Bearer ${newToken}`
                }
                const result = await axiosPrivate(prevConfig)
                error.response = result
                error.response.status = 200
            }
            return Promise.reject(error)
        }
    )

    return axiosPrivate
}


export { axiosPublic, axiosPrivate, useAxiosPrivate }
