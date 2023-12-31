import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../Components/Core/PageComponent";
import TButton from "../../Components/Core/TButton";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import Transactionspdf from "./PDFs/Transactionspdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchs, setSearchs] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        getTransactions()
            .then(jsonData => {
                setTransactions(jsonData)
                return jsonData
            })
            .then(jsonData => {
                setSearchResults(jsonData)
            })
            .catch(() => { })
    }, [])

    const handleDelete = (async (transaction) => {
        if (!window.confirm('Are you sure you want to delete this User?')) {
            return
        }
    })

    const getTransactions = (async () => {
        setLoading(true)
        try {
            const transactionz = await axiosClient.get('/transactions')
            return transactionz.data.data
        } catch (err) {

        }
    })

    /**
     * Search form
     */
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(transactions)
        const searchArray = transactions.filter(transaction =>
            transaction.txnDate.includes(searchs) ||
            transaction.Folio.includes(searchs)
        )
        setSearchResults(searchArray)
        // console.log(searchs)
    }
    return (
        <PageComponent
            heading={
                <div className="font-semibold capitalize text-green-700">
                    Transactions
                </div>

            }
            handleSearch={handleSearch}
            searchs={searchs}
            setSearchs={setSearchs}
            buttonz={
                <TButton color="green" to="/transactions/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    Register User
                </TButton>}
        >
            <PDFDownloadLink
                document={
                    <Transactionspdf
                        transactionsPdf={searchResults}
                    />
                }
                fileName="TransactionsPDF"
            >
                {({ loading }) => (loading ? <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Document Loading ...</button> : <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Download PDF</button>)}
            </PDFDownloadLink>
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-6 text-left">Date</th>
                        <th className="py-1 px-6 text-left">Folio</th>
                        <th className="py-1 px-6 text-right">Dr</th>
                        <th className="py-1 px-6 text-right">Cr</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults ?
                        searchResults.map(transaction => (
                            <tr className="border-b border-gray-400" key={transaction.id}>
                                <td className="py-0 px-6">{DateFormat(transaction.txnDate)}</td>
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
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-red-500 text-center">
                                    No record in the database!!!
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table >
        </PageComponent >
    )
}
