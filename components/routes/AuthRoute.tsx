"use client"

import React, { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

interface AuthRouteProps {
	children: React.ReactNode
	isProtected?: boolean // If true, the route is protected
	redirectPath?: string // Path to redirect if unauthorized
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children, isProtected = false, redirectPath = "/signin" }) => {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading) {
			if (isProtected && !user) {
				// Redirect unauthenticated users to the signin page
				router.push(redirectPath)
			} else if (!isProtected && user) {
				// Redirect authenticated users away from public routes
				router.push("/dashboard")
			}
		}
	}, [user, loading, isProtected, redirectPath, router])

	// Show a loading state while checking authentication
	if (loading) {
		return <p>Loading...</p>
	}

	// Prevent rendering children if redirecting
	if ((isProtected && !user) || (!isProtected && user)) {
		return null
	}

	return <>{children}</>
}

export default AuthRoute
