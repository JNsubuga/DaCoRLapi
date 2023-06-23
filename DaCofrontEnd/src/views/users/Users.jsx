import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"
import TButton from "../../Components/Core/TButton"
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import PageComponent from "../../Components/Core/PageComponent"
import { useStateContext } from "../../Contexts/ContextProvider"

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    useEffect(() => {
        getUsers()
    }, [])

    const handleDelete = async (user) => {
        if (!window.confirm('Are you sure you want to delete this User!!!')) {
            return
        }
        try {
            await axiosClient.delete(`/users/${user.id}`)
                .then(() => {
                    setNotification("User was successfully Deleted!!")
                    getUsers()
                })
                .catch((err) => {
                    const response = err.response
                    console.log(response)
                })
        } catch (error) {

        }
    }

    const getUsers = (() => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    })
    return (
        <PageComponent heading="Users"
            buttonz={(
                <TButton color="green" to="/users/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    Register User
                </TButton>
            )}>
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-500">
                            <th className="text-right px-1">ID</th>
                            <th className="text-left px-1">Name</th>
                            <th className="text-left px-1">Email</th>
                            <th className="text-left px-1">Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading && <tbody>
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading ...
                            </td>
                        </tr>
                    </tbody>
                    }
                    {!loading && <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-300">
                                <td className="py-0 px-1 text-right">{user.id}</td>
                                <td className="py-0 px-1">{user.name}</td>
                                <td className="py-0 px-1">{user.email}</td>
                                <td className="py-0 px-1">{user.created_at}</td>
                                <td className="flex items-center justify-center">
                                    <TButton color="orange" to={'/users/' + user.id + '/edit'}>
                                        <PencilIcon className="h-6 w-6 mr-1" />
                                        Edit
                                    </TButton>
                                    <TButton color="red" onClick={(ev) => handleDelete(user)}>
                                        <TrashIcon className="h-6 w-6 mx-auto" />
                                    </TButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </PageComponent>

    )
}
