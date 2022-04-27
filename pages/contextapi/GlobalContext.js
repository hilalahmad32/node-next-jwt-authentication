import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [isLogedIn, setIsLogedIn] = useState(false)
    const [users, setUsers] = useState({})
    const router = useRouter()

    const getUser = async () => {
        const res = await (await fetch('../api/auth/user')).json();
        if (res.success) {
            setUsers(res.users);
            setIsLogedIn(true);
        }
    }
    const logoutUser = async () => {
        setUsers({});
        setIsLogedIn(false);
        const res = await (await fetch('../api/auth/logout')).json();
        if (res) {
            router.push('/signin')
        }
    }
    useEffect(() => {
        getUser();
    }, [])

    return (
        <GlobalContext.Provider value={{ isLogedIn, getUser, users, logoutUser }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;