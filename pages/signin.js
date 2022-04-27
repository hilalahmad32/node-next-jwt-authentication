import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import SigninForm from '../components/SigninForm'
import { useRouter } from 'next/router'
const signin = () => {
    const router = useRouter()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        } else {
            router.push('/signin')
        }
    })
    return (
        <div>
            <Navbar />
            <SigninForm />
        </div>
    )
}

export default signin