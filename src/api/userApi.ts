import apiClient from "./apiClient";
import { User } from "./types";

const USER_ROUTE = "/users";

export const getProfile = async (): Promise<User> => {
    return (await apiClient.get(`${USER_ROUTE}/profile`)).data
}