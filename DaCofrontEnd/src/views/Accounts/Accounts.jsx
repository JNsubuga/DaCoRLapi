import { useEffect, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosClient from "../../axiosClient"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { CurrencyFormat } from "../../Components/Core/Locale"

export default function Accounts() {
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    useEffect(() => {
        getAccounts()
    }, [])

    const getAccounts = async () => {
        setLoading(true)
        await axiosClient.get('/accounts')
            .then(({ data }) => {
                setLoading(false)
                setAccounts(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const handleDelete = async (account) => {
        if (!window.confirm('Are you sure you want to delete this Account?')) {
            return
        }
        try {
            await axiosClient.delete(`/accounts/${account.id}`)
                .then(() => {
                    //     console.log(data)
                    setNotification("Account was successfully Deleted!!")
                    getAccounts()
                })
                .catch((error) => {
                    const response = error.response
                    console.log(response)
                })
        } catch (error) {
            const response = error.response
            console.log(response)
        }
    }

    return (
        <PageComponent
            heading="Accounts"
            buttonz={(
                <TButton color="green" to="/accounts/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    New Account
                </TButton>
            )}>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-6 text-left">Account</th>
                        <th className="py-1 px-6 text-right">Year of account Opening</th>
                        <th className="py-1 px-6 text-left">Code</th>
                        <th className="py-1 px-6 text-right">Principle</th>
                        <th className="py-1 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts && accounts.map(account => (
                        <tr className="border-b border-gray-400" key={account.id}>
                            <td className="py-0 px-6">
                                <Link to={`/accounts/${account.id}`}>
                                    {account.Name}
                                </Link>
                            </td>
                            <td className="py-0 px-6 text-right">{account.year}</td>
                            <td className="py-0 px-6 text-left">{account.Code}</td>
                            <td className="py-0 px-6 text-right">{CurrencyFormat(account.AnualPrinciple)}</td>
                            <td className="flex items-center justify-center">
                                <TButton color="orange" to={'/accounts/' + account.id + '/edit'}>
                                    <PencilIcon className="h-6 w-6 mr-1" />
                                    Edit
                                </TButton>
                                <TButton color="red" onClick={() => handleDelete(account)}>
                                    <TrashIcon className="h-6 w-6 mx-auto" />
                                </TButton>
                            </td>
                        </tr>
                    ))}
                    {!accounts &&
                        <tbody>
                            < tr ><td colspan="5" className="text-red-500">No record in the database!!!</td></tr >
                        </tbody>
                    }
                </tbody>
            </table>
        </PageComponent>
    )
}
