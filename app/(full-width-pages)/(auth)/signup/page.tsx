import SignUpForm from "@/components/auth/SignUpForm"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "SignUp Page",
	description: "Sign Up Page"
	// other metadata
}

export default function SignUp() {
	return <SignUpForm />
}
