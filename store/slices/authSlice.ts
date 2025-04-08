import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../index"
import { createAsyncAction } from "@/store/helpers/createAsyncAction"
import { login, fetchUser, logout } from "@/services/authService"
import { User } from "@/types/auth"

interface AuthState {
	user: User | null
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authStart(state) {
			state.loading = true
			state.error = null
		},
		authSuccess(state, action: PayloadAction<User>) {
			state.loading = false
			state.user = action.payload
		},
		authFailure(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		},
		logoutSuccess(state) {
			state.user = null
		}
	}
})

export const {
	authStart,
	authSuccess,
	authFailure,

	logoutSuccess
} = authSlice.actions

// Login Action
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
	dispatch(authStart())
	try {
		const { token } = await login(email, password)
		localStorage.setItem("authToken", token) // Store token (or use cookies)
		const user = await fetchUser()
		dispatch(authSuccess(user))
	} catch (error: any) {
		dispatch(authFailure(error.message))
	}
}

// Fetch User Action
export const fetchCurrentUser = () => async (dispatch: AppDispatch) => {
	dispatch(authStart())
	try {
		const user = await fetchUser()
		dispatch(authSuccess(user))
	} catch (error: any) {
		dispatch(authFailure(error.message))
	}
}

// Logout Action
export const logoutUser = () => async (dispatch: AppDispatch) => {
	try {
		await logout()
		localStorage.removeItem("authToken") // Clear token
		dispatch(logoutSuccess())
	} catch (error: any) {
		console.error("Logout failed:", error)
	}
}

export default authSlice.reducer
