import type { Metadata } from "next"
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics"
import React, { useEffect } from "react"
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget"
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart"
import StatisticsChart from "@/components/ecommerce/StatisticsChart"
import RecentOrders from "@/components/ecommerce/RecentOrders"
import DemographicCard from "@/components/ecommerce/DemographicCard"

import { useAppDispatch, useAppSelector } from "@/redux/store"
import { fetchExampleData } from "@/redux/slices/exampleSlice"

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Dashboard for ecommerce"
}

export default function Ecommerce() {
	const dispatch = useAppDispatch()
	const { data, loading, error } = useAppSelector((state) => state.example)

	useEffect(() => {
		dispatch(fetchExampleData())
	}, [dispatch])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error}</div>
	return (
		<div className="grid grid-cols-12 gap-4 md:gap-6">
			<div className="col-span-12 space-y-6 xl:col-span-7">
				<EcommerceMetrics />

				<MonthlySalesChart />
			</div>

			<div className="col-span-12 xl:col-span-5">
				<MonthlyTarget />
			</div>

			<div className="col-span-12">
				<StatisticsChart />
			</div>

			<div className="col-span-12 xl:col-span-5">
				<DemographicCard />
			</div>

			<div className="col-span-12 xl:col-span-7">
				<RecentOrders />
			</div>

			<div>
				<ul>
					{data.map((item, index) => (
						<li
							key={index}
							className="border-b py-2"
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
