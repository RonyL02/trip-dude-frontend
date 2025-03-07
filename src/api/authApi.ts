import apiClient from "./apiClient"
import { CreateUserDto, User } from "./types"

const AUTH_ROUTE = "/auth";
const POSTS_ROUTE = "/posts";

export const loginWithGoogle = async (token: string): Promise<User> => {
  return (await apiClient.post(`${AUTH_ROUTE}/google-login`, { credential: token })).data
}

export const login = async (email: string, password: string): Promise<User> => {
  return (await apiClient.post(`${AUTH_ROUTE}/login`, { email, password })).data
}

export const register = async (user: CreateUserDto): Promise<{ newId: string }> => {
  return (await apiClient.post(`${AUTH_ROUTE}/register`, user)).data
}

export const createPost = (postData: { title: string; description: string; imageUrl: string }) => {
  return apiClient.post(`${POSTS_ROUTE}/create`, postData);
};
