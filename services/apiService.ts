import api from "./api"

export const apiRequest = async <T>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, data?: any): Promise<T> => {
	try {
		const response = await api.request<T>({
			method,
			url,
			data
		})
		return response.data
	} catch (error: any) {
		console.error(`API Error [${method} ${url}]:`, error)
		throw new Error(error.response?.data?.message || "An error occurred while processing the request.")
	}
}
