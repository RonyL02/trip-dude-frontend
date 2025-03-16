import apiClient from "./apiClient";
import { CreatePostDto, Post } from "./types";

const POSTS_ROUTE = "/posts";

export const createPost = (postData: CreatePostDto) => {
    return apiClient.post(POSTS_ROUTE, postData);
};

export const getPosts = async (query: Partial<Post> = {}): Promise<Post[]> => {
    return (await (apiClient.get(POSTS_ROUTE, { params: query }))).data;
}

export const likePost = (postId: string) => {
    return apiClient.post(`${POSTS_ROUTE}/${postId}/like`);
}

export const updatePost = (postId: string, post: Partial<CreatePostDto>) => {
    return apiClient.patch(`${POSTS_ROUTE}/${postId}`, post);
}

