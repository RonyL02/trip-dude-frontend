import apiClient from "./apiClient"

const FILES_ROUTE = '/files'

export const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post(FILES_ROUTE, formData, {
        headers: {
            'Content-Type': 'image/*'
        }
    })

    return response.data as { newFileUrl: string }
}