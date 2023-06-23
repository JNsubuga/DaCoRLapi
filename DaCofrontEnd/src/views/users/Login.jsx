import { useRef, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import axiosClient from "../../axiosClient";

export default function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null)

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        // console.log(payload)
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

            })
            .catch(response => {
                // debugger
                // const response = response
                if (response && response.status === 422) {
                    if (response.errors) {
                        setErrors(response.errors)
                        console.log(errors)

                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }
    return (
        <div className="max-w-xl mx-auto bg-slate-200 p-4 mt-4 rounded-xl">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
                Sign in to your account
            </h2>
            {errors && <div>
                {Object.keys(errors).map(key => (
                    < p key={key} > {errors[key][0]}</p>
                ))}
            </div>}
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            // value={email}
                            // onChange={(ev) => setEmail(ev.target.value)}
                            ref={emailRef}
                            autoFocus
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>

                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            // value={password}
                            // onChange={(ev) => setPassword(ev.target.value)}
                            ref={passwordRef}
                            // required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full  justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className='h-8 w-8 text-indigo-300 group-hover:text-indigo-400' aria-hidden='true' />
                        </span>
                        Sign in
                    </button>
                </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Signup for free
                </Link>
            </p>
        </div >

    )
}
