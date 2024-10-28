
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { validateEmail, verifyUserFromAuthenticationEmail } from "@/functions/globalFuntions"

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
        <h4> {msg} </h4>
    )
}