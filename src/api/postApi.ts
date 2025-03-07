import apiClient from "./apiClient";
import { CreatePostDto } from "./types";

const POSTS_ROUTE = "/posts";

export const createPost = (postData: CreatePostDto) => {
    return apiClient.post(POSTS_ROUTE, postData);
};