import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axiosInstance from "@/utils/axiosInstance"

export const fetchExampleData = createAsyncThunk("example/fetchData", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get("/example-endpoint") // Replace with your API endpoint
		return response.data
	} catch (error: any) {
		return rejectWithValue(error.response?.data || error.message)
	}
})

interface ExampleState {
	data: string[]
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
		fetchStart(state) {
			state.loading = true
			state.error = null
		},
		fetchSuccess(state, action: PayloadAction<string[]>) {
			state.loading = false
			state.data = action.payload
		},
		fetchFailure(state, action: PayloadAction<string>) {
			state.loading = false
			state.error = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchExampleData.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchExampleData.fulfilled, (state, action: PayloadAction<string[]>) => {
				state.loading = false
				state.data = action.payload
			})
			.addCase(fetchExampleData.rejected, (state, action: PayloadAction<string>) => {
				state.loading = false
				state.error = action.payload as string
			})
	}
})

export const { fetchStart, fetchSuccess, fetchFailure } = exampleSlice.actions
export default exampleSlice.reducer
