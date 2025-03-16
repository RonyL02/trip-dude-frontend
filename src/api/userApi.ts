import apiClient from "./apiClient";
import { User } from "./types";

const USER_ROUTE = "/users";

export const getProfile = async (): Promise<User> => {
    return (await apiClient.get(`${USER_ROUTE}/profile`)).data
}

export const updateProfile = (user: Partial<User>) => {
    return apiClient.patch(USER_ROUTE, user)
}

export const getUserById = async (id: string): Promise<User> => {
    return (await apiClient.get(`${USER_ROUTE}/${id}`)).data
}