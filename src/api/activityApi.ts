import apiClient from "./apiClient";
import { Activity, SavedActivityDto } from "./types";

const ACTIVITY_ROUTE = "/activities";


export const getLocations = async (name: string): Promise<string[]> => {
    return (await apiClient.get(`${ACTIVITY_ROUTE}/location`, { params: { name } })).data
}

export const getActivities = async (location: string, description: string): Promise<Activity[]> => {
    return (await apiClient.get(`${ACTIVITY_ROUTE}/`, { params: { location, description } })).data
}

export const saveActivity = async (activity: SavedActivityDto): Promise<{ newId: string }> => {
    return (await apiClient.post(`${ACTIVITY_ROUTE}/`, activity)).data
}

export const getActivityById = async (id: string): Promise<SavedActivityDto> => {
    return (await apiClient.get(`${ACTIVITY_ROUTE}/${id}`)).data
}
