import apiClient from "./apiClient";
import { Comment } from "./types";

const COMMENTS_ROUTE = "/comments";

export const addComment = async (commentData: { content: string, postId: string }): Promise<{ newId: string }> => {
    return (await apiClient.post(`${COMMENTS_ROUTE}`, commentData)).data;
};

export const getComments = async (postId: string): Promise<Comment[]> => {
    return (await apiClient.get(`${COMMENTS_ROUTE}`, {
        params: {
            postId
        }
    })).data;
};