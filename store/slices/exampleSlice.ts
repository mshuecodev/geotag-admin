import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../index"
import { createAsyncAction } from "@/store/helpers/createAsyncAction"
import { ExampleData } from "@/types/example"
import { fetchExampleDataFromAPI, addExampleDataToAPI, deleteExampleDataFromAPI } from "@/services/exampleService"

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
		},
		addDataSuccess(state, action: PayloadAction<ExampleData>) {
			state.data.push(action.payload)
		},
		deleteDataSuccess(state, action: PayloadAction<number>) {
			state.data = state.data.filter((item) => item.id !== action.payload)
		}
	}
})

export const {
	fetchDataStart,
	fetchDataSuccess,
	fetchDataFailure,

	addDataSuccess,
	deleteDataSuccess
} = exampleSlice.actions

export const fetchExampleData = () => async (dispatch: AppDispatch) => {
	await createAsyncAction(dispatch, fetchExampleDataFromAPI, {
		start: fetchDataStart,
		success: fetchDataSuccess,
		failure: fetchDataFailure
	})
}

// Add new data (POST)
export const addExampleData = (newData: ExampleData) => async (dispatch: AppDispatch) => {
	await createAsyncAction(dispatch, () => addExampleDataToAPI(newData), {
		start: fetchDataStart,
		success: addDataSuccess,
		failure: fetchDataFailure
	})
}

// Delete data (DELETE)
export const deleteExampleData = (id: number) => async (dispatch: AppDispatch) => {
	await createAsyncAction(dispatch, () => deleteExampleDataFromAPI(id), {
		start: fetchDataStart,
		success: () => deleteDataSuccess(id),
		failure: fetchDataFailure
	})
}

export default exampleSlice.reducer
