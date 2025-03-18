
'use client'
import { validateEmail, verifyUserFromAuthenticationEmail } from "@/genericFunctions/geneFunc";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthenticateUser() { 

    const [msg, setMsg] = useState('')
    const router = useRouter()
    
    useEffect(() => {
        verifyUser()
    }, [])

    async function verifyUser() {
        let path = location.pathname
        
        if(path.indexOf('access') > -1 && path.indexOf('verify-user') > -1) {
            let pathArr = path.split('/')
            if(pathArr?.length > 1) {
                let id =  pathArr[pathArr.length - 1]
                let email = pathArr[pathArr.length - 2]
                if(validateEmail(email) && id?.length > 0) {
                    console.log('email', email, 'id', id)
                    setMsg('Please Wait.... Verifying User')
                    let res = await verifyUserFromAuthenticationEmail(email, id)
                    if(res.success) {
                        setMsg('Email verified Successfully. Please login to your account')
                    }
                    else {
                        setMsg('Something went wrong!')
                    }
                    console.log('res', res)
                }
                else {
                    router.push('/')
                }
            }
            else { 
                router.push('/')
            }
        }
        else { 
            router.push('/')
        }
    }
    
    return (
        <div style={{ height:'50vh', textAlign:"center" }}>
            <h4 style={{ textAlign:"center", marginTop:"100px" }} > {msg} </h4>
            <p><Link href="/"> Go To Main Page </Link></p>
        </div>
    )
}