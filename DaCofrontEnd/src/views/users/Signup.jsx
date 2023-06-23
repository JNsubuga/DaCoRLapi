import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import axiosClient from "../../axiosClient";

export default function Signup() {
    // const [fullName, setFullName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    // const [confirm_password, setConfirmPassword] = useState();

    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const handleSignup = (ev) => {
        ev.preventDefault();
        const payload = {
            name: fullNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    // console.log(response.data.errors)
                    setErrors(response.data.errors)
                }
            })
    }
    return (
        <div className="max-w-xl mx-auto bg-slate-200 p-4 mt-4 rounded-xl">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 capitalize">
                Sign up for a new account
            </h2>
            {errors && <div>
                {Object.keys(errors).map(key => {
                    <p key={key}>{errors[key][0]}</p>
                })}
            </div>}
            <form onSubmit={handleSignup} className="space-y-6" action="#" method="POST" >
                {/* <div className="flex items-center justify-between"> */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            // value={fullName}
                            // onChange={(ev) => setFullName(ev.target.value)}
                            ref={fullNameRef}
                            autoComplete="fullName"
                            autoFocus
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>

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
                            autoComplete="email"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                            Confirm Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="confirm-password"
                            name="confirm_password"
                            type="password"
                            // value={confirm_password}
                            // onChange={(ev) => setConfirmPassword(ev.target.value)}
                            ref={passwordConfirmationRef}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
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
                A member?{' '}
                <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login with your account
                </Link>
            </p>
        </div>
    )
}
