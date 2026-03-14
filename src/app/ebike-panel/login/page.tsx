import LoginForm from "@/ebike-panel/ebike-panel-sharedComponent/Login";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Ebike Panel Login",
    robots: {
        index: false,
        follow: false
    }
};

const Login = () => {
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    );
};

export default Login;
