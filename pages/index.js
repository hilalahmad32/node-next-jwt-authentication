import { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { GlobalContext } from './contextapi/GlobalContext'
import { useRouter } from 'next/router'
export default function Home() {
  const router = useRouter()

  const { users, getUser } = useContext(GlobalContext)
  useEffect(() => {
    getUser();
    if (localStorage.getItem('token')) {
      router.push('/')
    } else {
      router.push('/signin')
    }
  }, [])

  return (
    <div >
      <Navbar />
      <div className="container my-5 max-w-xl mx-auto">
        <div className="shadow p-4">
          {users !== undefined ? users.name : 'Please login'}
        </div>
      </div>

    </div>
  )
}
