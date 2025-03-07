import apiClient from "./apiClient";
import { CreateUserDto } from "./types";

const AUTH_ROUTE = "/auth";
const POSTS_ROUTE = "/posts"; 
const COMMENTS_ROUTE = "/comments";

export const loginWithGoogle = (token: string) => {
  return apiClient.post(`${AUTH_ROUTE}/google-login`, { credential: token });
};

export const login = (email: string, password: string) => {
  return apiClient.post(`${AUTH_ROUTE}/login`, { email, password });
};

export const register = (user: CreateUserDto) => {
  return apiClient.post(`${AUTH_ROUTE}/register`, user);
};

export const createPost = (postData: { title: string; description: string; imageUrl: string }) => {
  return apiClient.post(`${POSTS_ROUTE}/create`, postData);
};

export const addComment = (postId: string, commentData: { username: string; text: string }) => {
  return apiClient.post(`${COMMENTS_ROUTE}/${postId}/add`, commentData);
};

export const getComments = (postId: string) => {
  return apiClient.get(`${COMMENTS_ROUTE}/${postId}`);
};