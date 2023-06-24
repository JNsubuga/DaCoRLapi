import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosClient from "../../axiosClient"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"

export default function AccountForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState()
    const [errors, setErrors] = useState()
    const { setNotification } = useStateContext()

    const [account, setAccount] = useState({
        id: null,
        Name: '',
        year: '',
        Code: '',
        AnualPrinciple: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/accounts/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setAccount(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (account.id) {
            axiosClient.put(`/accounts/${account.id}`, account)
                .then(() => {
                    setNotification("User was successfully Updated!!")
                    navigate('/accounts')
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post(`/accounts`, account)
                .then(() => {
                    setNotification("User was successfully Registered!!")
                    navigate('/accounts')
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
                !account.id == true ?
                    <div>New Account</div> :
                    <div>Update: {account.Name}</div>
            }
            buttonz={
                <TButton to="/users" back>
                    Accounts List
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
                        name="Name"
                        type="text"
                        value={account.Name}
                        onChange={(ev) => setAccount({ ...account, Name: ev.target.value })}
                        placeholder="Account Name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="year"
                        type="number"
                        value={account.year}
                        onChange={(ev) => setAccount({ ...account, year: ev.target.value })}
                        placeholder="Year"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="Code"
                        type="text"
                        value={account.Code}
                        onChange={(ev) => setAccount({ ...account, Code: ev.target.value })}
                        placeholder="Code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="AnualPrinciple"
                        type="number"
                        value={account.AnualPrinciple}
                        onChange={(ev) => setAccount({ ...account, AnualPrinciple: ev.target.value })}
                        placeholder="AnualPrinciple"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    {!account.id == true ?
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
