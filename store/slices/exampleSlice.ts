import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../index"
import api from "@/services/api"

interface ExampleState {
	data: any[]
	loading: boolean
	error: string | null
}

const initialState: ExampleState = {
	data: [],
	loading: false,
	error: null
}

const exampleSlice = createSlice({
	name: "example",
	initialState,
	reducers: {
		fetchDataStart(state) {
			state.loading = true
			state.error = null
		},
		fetchDataSuccess(state, action: PayloadAction<any[]>) {
			state.loading = false
			state.data = action.payload
		},
		fetchDataFailure(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		}
	}
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = exampleSlice.actions

export const fetchExampleData = () => async (dispatch: AppDispatch) => {
	dispatch(fetchDataStart())
	try {
		const response = await api.get("/auth/test")
		dispatch(fetchDataSuccess(response.data))
	} catch (error: any) {
		dispatch(fetchDataFailure(error.message))
	}
}

export default exampleSlice.reducer
