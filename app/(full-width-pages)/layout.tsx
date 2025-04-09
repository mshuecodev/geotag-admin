import AuthRoute from "@/components/routes/AuthRoute"

export default function FullWidthPageLayout({ children }: { children: React.ReactNode }) {
	return (
		// <AuthRoute isProtected={false}>
		<div>{children}</div>
		// </AuthRoute>
	)
}
