import axios from "axios"

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:100",
	timeout: 10000
})

export default api
