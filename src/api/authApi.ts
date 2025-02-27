import apiClient from "./apiClient"
import { CreateUserDto } from "./types"

const AUTH_ROUTE = '/auth'

export const loginWithGoogle = (token: string) => {
   return apiClient.post(`${AUTH_ROUTE}/google-login`, { credential: token })
}

export const login = (email: string, password: string) => {
   return apiClient.post(`${AUTH_ROUTE}/login`, { email, password })
}

export const register = (user: CreateUserDto) => {
   return apiClient.post(`${AUTH_ROUTE}/register`, user)
}