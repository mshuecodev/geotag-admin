import { Metadata } from "next"
import SignInForm from "@/components/auth/SignInForm"

export const metadata: Metadata = {
	title: "Sign In Page",
	description: "Hello there! sign in page here"
}

export default function SignIn() {
	return <SignInForm />
}
