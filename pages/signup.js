import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'
import { useRouter } from 'next/router'
const signup = () => {
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
            <SignupForm />
        </div>
    )
}

export default signup