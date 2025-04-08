import { apiRequest } from "./apiService"
import { ExampleData } from "@/types/example"

export const fetchExampleDataFromAPI = async (): Promise<ExampleData[]> => {
	return apiRequest<ExampleData[]>("GET", "/auth/test")
}

// Add new data (POST)
export const addExampleDataToAPI = async (newData: ExampleData): Promise<ExampleData> => {
	return apiRequest<ExampleData>("POST", "/auth/test", newData)
}

// Delete data (DELETE)
export const deleteExampleDataFromAPI = async (id: number): Promise<void> => {
	return apiRequest<void>("DELETE", `/auth/test/${id}`)
}
