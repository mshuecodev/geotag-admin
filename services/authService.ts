import { apiRequest } from "./apiService"
import { LoginResponse, User } from "@/types/auth"

export const fetchUser = async (): Promise<User> => {
	return apiRequest<User>("GET", "/auth/profile")
}

export const logout = async (): Promise<void> => {
	return apiRequest("POST", "/auth/logout")
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
	return apiRequest<LoginResponse>("POST", "/auth/login", { email, password })
}
