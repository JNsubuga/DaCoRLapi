import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../Components/Core/PageComponent";
import TButton from "../../Components/Core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getTransactions()
    }, [])

    const handleDelete = (async (transaction) => {
        if (!window.confirm('Are you sure you want to delete this User?')) {
            return
        }
    })

    const getTransactions = (async () => {
        setLoading(true)
        try {
            await axiosClient.get('/transactions')
                .then(({ data }) => {
                    setLoading(false)
                    console.log(data.data)
                    setTransactions(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        } catch (err) {

        }
    })

    return (
        <PageComponent
            heading={
                <div className="font-semibold capitalize text-green-700">
                    Transactions
                </div>

            }
            buttonz={
                <TButton color="green" to="/transactions/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    Register User
                </TButton>}
        >
            <div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-600 font-bold capitalize">
                            <th className="py-1 px-6 text-left">Date</th>
                            <th className="py-1 px-6 text-left">Folio</th>
                            <th className="py-1 px-6 text-right">Dr</th>
                            <th className="py-1 px-6 text-right">Cr</th>
                            {/* <th className="py-1 px-6">Action</th> */}
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading ...
                                </td>
                            </tr>
                        </tbody>}
                    {!loading &&
                        <tbody>
                            {transactions &&
                                transactions.map(transaction => (
                                    <tr className="border-b border-gray-400" key={transaction.id}>
                                        <td className="py-0 px-6">{DateFormat(transaction.txnDate)}</td>
                                        {/* <td className="py-0 px-6 text-left">{'F' + transaction.accountOpeningYear + '-' + transaction.memberCode + '-' + transaction.accountCode}</td> */}
                                        <td className="py-0 px-6 text-left">{transaction.Folio}</td>
                                        {transaction.event == 1 &&
                                            <>
                                                <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                                                <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                            </>
                                        }
                                        {transaction.event == 2 &&
                                            <>
                                                <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                                <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                                            </>
                                        }
                                    </tr >
                                ))
                            }
                        </tbody>
                    }
                    {!transactions &&
                        <tbody>
                            < tr ><td colspan="5" className="text-red-500 text-center">No record in the database!!!</td></tr >
                        </tbody>
                    }
                </table >
            </div >
        </PageComponent >

    )
}
