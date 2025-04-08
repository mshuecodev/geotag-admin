"use client"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchExampleData } from "@/store/slices/exampleSlice"
import { AppDispatch, RootState } from "@/store"

const ExampleComponent: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data, loading, error } = useSelector((state: RootState) => state.example)

	console.log("data", data)
	useEffect(() => {
		dispatch(fetchExampleData())
	}, [dispatch])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	return (
		<ul>
			{/* {data.map((item) => (
				<li key={item.id}>{item.name}</li>
			))} */}
		</ul>
	)
}

export default ExampleComponent
