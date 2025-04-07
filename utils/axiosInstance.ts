import axios from "axios"

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000", // Replace with your API base URL
	timeout: 10000 // Request timeout in milliseconds
})

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token") // Replace with your token retrieval logic
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`
	}
	return config
})

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error.response?.data || error.message)
	}
)

export default axiosInstance
