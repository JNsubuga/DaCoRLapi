import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"
import { useParams } from "react-router-dom"
import PageComponent from "../../Components/Core/PageComponent"
import CurrencyFormat from "../../Components/Core/CurrencyFormat"

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
            heading={member}>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-gray-400 font-bold capitalize">
                        <th className="py-1 px-6 text-left">Date</th>
                        <th className="py-1 px-6 text-left">Account</th>
                        <th className="py-1 px-6 text-left">Folio</th>
                        <th className="py-1 px-6 text-right">Dr</th>
                        <th className="py-1 px-6 text-right">Cr</th>
                        {/* <th className="py-1 px-6">Action</th> */}
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
                {!loading &&
                    <tbody>
                        {
                            memberTransactionDetails &&
                            memberTransactionDetails.map(transaction => (
                                <tr key={transaction.txnId}>
                                    <td className="py-0 px-6">{transaction.txnDate}</td>
                                    <td className="py-0 px-6">{transaction.accountName}</td>
                                    <td className="py-0 px-6 text-left">{'F' + transaction.accountOpeningYear + '-' + transaction.memberCode + '-' + transaction.accountCode}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Cr)}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Dr)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                }
                {!memberTransactionDetails && <tbody>
                    <tbody>
                        < tr ><td colspan="5" className="text-red-500 text-center">No record in the database!!!</td></tr >
                    </tbody>
                </tbody>
                }
            </table>

        </PageComponent>

    )
}
