import Link from 'next/link'
import React, { useContext } from 'react'
import { GlobalContext } from '../pages/contextapi/GlobalContext'

const Navbar = () => {
    const { isLogedIn, logoutUser } = useContext(GlobalContext)
    const logout = () => {
        logoutUser();
        localStorage.removeItem('token')
    }
    return (
        <div className="bg-green-400">
            <div className="container py-4 mx-auto">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl text-white">
                        <Link href={'/'}>Home</Link>
                    </h3>
                    {isLogedIn && <button onClick={logout}>logout</button>}
                    {!isLogedIn && <>
                        <div className="flex">
                            <Link href={'/signin'}>
                                <a> <h1 className="text-white text-xl">Signin</h1></a>
                            </Link>
                            <Link href={'/signup'} >
                                <a> <h1 className="ml-3 text-white text-xl">Signup</h1></a>
                            </Link>
                        </div></>}
                </div>
            </div>
        </div>
    )
}

export default Navbar