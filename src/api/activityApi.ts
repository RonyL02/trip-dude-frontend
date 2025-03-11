import apiClient from "./apiClient";
import { Activity } from "./types";

const ACTIVITY_ROUTE = "/activities";


export const getLocations = async (name: string): Promise<string[]> => {
    return (await apiClient.get(`${ACTIVITY_ROUTE}/location`, { params: { name } })).data
}

export const getActivities = async (location: string, description: string): Promise<Activity[]> => {
    return (await apiClient.get(`${ACTIVITY_ROUTE}/`, { params: { location, description } })).data
}

export const saveActivity = async (activity: Activity): Promise<{ newId: string }> => {
    return (await apiClient.post(`${ACTIVITY_ROUTE}/`, activity)).data
}