import React, { useState } from 'react'
import { useRouter } from 'next/router';

const SigninForm = () => {
    const router = useRouter()
    const [users, setUsers] = useState({
        email: '',
        password: ''
    });
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUsers({ ...users, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = users;
        const data = { email, password };
        const res = await (await fetch('./api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json();
        if (res.success) {
            alert(res.message);
            setUsers({
                email: '',
                password: ''
            });
            localStorage.setItem('token', res.token)
            router.push('/')
        } else {
            alert(res.message);
        }
    }
    return (
        <div>
            <div className="container my-5 max-w-xl mx-auto">
                <div className="shadow p-4">
                    <h1 className="text-center text-2xl mt-4">
                        User SignIn
                    </h1>
                    <form action="" onSubmit={handleSubmit} className="my-3">
                        <div className="my-3">
                            <input type="email" name="email"
                                value={users.email} onChange={onChangeHandler} className="rounded w-full px-2 py-2 border outline-green-400 text-xl" placeholder="Enter your Email" />
                        </div>
                        <div className="my-3">
                            <input type="password" value={users.password} onChange={onChangeHandler} name="password" className="rounded w-full px-2 py-2 border outline-green-400 text-xl" placeholder="Enter your Password" />
                        </div>
                        <button className="rounded-md  px-6 py-2 border bg-green-400 hover:bg-green-600 text-md text-white" >Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SigninForm