import { AppDispatch } from "../index"

interface AsyncActionHandlers<T> {
	start: () => any
	success: (payload: T) => any
	failure: (error: string) => any
}

export const createAsyncAction = async <T>(dispatch: AppDispatch, asyncFunction: () => Promise<T>, handlers: AsyncActionHandlers<T>) => {
	dispatch(handlers.start())
	try {
		const data = await asyncFunction()
		dispatch(handlers.success(data))
	} catch (error: any) {
		dispatch(handlers.failure(error.message || "An error occurred"))
	}
}
