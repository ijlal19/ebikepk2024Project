import LoginForm from "@/ebike-panel/ebike-panel-sharedComponent/Login"
import Head from "next/head"
import * as React from 'react';

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