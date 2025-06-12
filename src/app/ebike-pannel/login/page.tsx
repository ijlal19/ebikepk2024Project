import LoginForm from "@/ebike-pannel/ebike-pannel-sharedComponent/Login"
import Head from "next/head"

const Login = ()=>{
    <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title> Ebike Panel Login </title>
    </Head>
    return(
        <div>
            <LoginForm />
        </div>
    )
}
export default Login