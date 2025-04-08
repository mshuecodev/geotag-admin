export interface LoginResponse {
	token: string // Authentication token (e.g., JWT)
	user?: User // Optional user details
}

export interface User {
	_id: number // Unique user ID
	name: string // User's full name
	email: string // User's email address
	role?: string // Optional user role (e.g., "admin", "user")
	avatarUrl?: string // Optional profile picture URL
}

export interface AuthState {
	user: User | null // The authenticated user or null if not logged in
	loading: boolean // Indicates if an authentication-related action is in progress
	error: string | null // Error message for failed actions
}

export interface LoginRequest {
	email: string // User's email address
	password: string // User's password
}

export interface LogoutResponse {
	message: string // Confirmation message (e.g., "Logout successful")
}
