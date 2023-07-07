import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"
import { useParams } from "react-router-dom"
import PageComponent from "../../Components/Core/PageComponent"
import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale"

export default function MemberTransactionDetails() {
    const { id } = useParams()
    // const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [memberTransactionDetails, setMemberTransactionDetails] = useState([])
    const [member, setMember] = useState(null)

    useEffect(() => {
        getMemberTransactionDetails()
    }, [])

    const getMemberTransactionDetails = async () => {
        setLoading(true)
        await axiosClient.get(`/members/memberTransactionDetails/${id}`)
            .then(({ data }) => {
                setLoading(false)
                setMember(data.data[0].member)
                setMemberTransactionDetails(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }


    // console.log(memberTransactionDetails[0].member)
    return (
        <PageComponent
            heading={
                <div className="font-semibold capitalize text-green-700">
                    {member + '\'s Transaction Details'}
                </div>
            }
        >

            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-6 text-left">Date</th>
                        <th className="py-1 px-6 text-left">Account</th>
                        <th className="py-1 px-6 text-left">Folio</th>
                        <th className="py-1 px-6 text-right">Dr</th>
                        <th className="py-1 px-6 text-right">Cr</th>
                        {/* <th className="py-1 px-6">Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading ...
                            </td>
                        </tr> :
                        (memberTransactionDetails ?
                            memberTransactionDetails.map(transaction => (
                                <tr key={transaction.txnId} className="border-b border-gray-400">
                                    <td className="py-0 px-6">{DateFormat(transaction.txnDate)}</td>
                                    <td className="py-0 px-6">{transaction.accountName}</td>
                                    <td className="py-0 px-6 text-left">{transaction.Folio}</td>
                                    {transaction.event == 1 &&
                                        <>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                                        </>
                                    }
                                    {transaction.event == 2 &&
                                        <>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                        </>
                                    }
                                </tr>
                            )) :
                            <tr>
                                <td colspan="5" className="text-red-500 text-center">
                                    No record in the database!!!
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </PageComponent>

    )
}
