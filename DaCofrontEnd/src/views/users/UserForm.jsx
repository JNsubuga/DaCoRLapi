import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../../axiosClient"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"
import { useStateContext } from "../../Contexts/ContextProvider"

export default function UserForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext()

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully Updated!!")
                    navigate('/users')
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post(`/users`, user)
                .then(() => {
                    //TODO Show Notification
                    setNotification("User was successfully Registered!!")
                    navigate('/users')
                })
                .catch((err) => {
                    const response = err.response
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <PageComponent
            heading={
                !user.id == true ?
                    <div>New User</div> :
                    <div>Update User: {user.name}</div>
            }
            buttonz={
                <TButton to="/users" back>
                    Users List
                </TButton>
            }>
            {errors && <div>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            {loading && (
                <div>Loading ...</div>
            )}
            {!loading &&
                <form onSubmit={handleSubmit} className="grid grid-cols-1 space-y-2 p-4 max-w-xl items-center bg-slate-100 mx-auto rounded-lg">
                    <input
                        name="fullName"
                        type="text"
                        value={user.name}
                        onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                        placeholder="Names"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="email"
                        type="email"
                        value={user.email} onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                        placeholder="Email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="password"
                        type="password"
                        onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                        placeholder="Password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="password_confirmation"
                        type="password"
                        onChange={(ev) => setUser({ ...user, password_confirmation: ev.target.value })}
                        placeholder="Confirm Password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    {!user.id == true ?
                        <TButton color="green">
                            Store Record
                        </TButton> :
                        <TButton color="green">
                            Update Record
                        </TButton>
                    }
                </form>
            }
        </PageComponent >
    )
}