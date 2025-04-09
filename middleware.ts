import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Centralized route configuration
const routes = {
	public: ["/signin", "/signup", "/forgot-password"],
	protected: {
		user: ["/dashboard", "/profile"],
		admin: ["/admin", "/settings"]
	}
}

export function middleware(request: NextRequest) {
	const token = request.cookies.get("accessToken")
	const userCookie = request.cookies.get("user")
	const role = userCookie ? JSON.parse(userCookie.value).role : undefined // Example: "user" or "admin"

	console.log("role", role)
	const isPublicRoute = routes.public.some((route) => request.nextUrl.pathname.startsWith(route))
	const isProtectedRoute = Object.values(routes.protected)
		.flat()
		.some((route) => request.nextUrl.pathname.startsWith(route))

	// Handle root route ("/")
	console.log("Request URL:", request.nextUrl.pathname)
	if (request.nextUrl.pathname === "/") {
		if (token) {
			return NextResponse.redirect(new URL("/dashboard", request.url)) // Redirect authenticated users to dashboard
		} else {
			return NextResponse.redirect(new URL("/signin", request.url)) // Redirect unauthenticated users to signin
		}
	}

	// Redirect unauthenticated users from protected routes
	if (!token && isProtectedRoute) {
		return NextResponse.redirect(new URL("/signin", request.url))
	}

	// Redirect authenticated users away from public routes
	if (token && isPublicRoute) {
		return NextResponse.redirect(new URL("/dashboard", request.url))
	}

	// Role-based access control
	if (token && role === "user" && routes.protected.admin.some((route) => request.nextUrl.pathname.startsWith(route))) {
		return NextResponse.redirect(new URL("/dashboard", request.url)) // Redirect non-admin users
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		"/",
		...routes.public,
		...Object.values(routes.protected)
			.flat()
			.map((route) => `${route}/:path*`)
	]
}
