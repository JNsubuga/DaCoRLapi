import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
import axiosClient from "../../axiosClient";
import { Link, useParams } from "react-router-dom";
import { CurrencyFormat } from "../../Components/Core/Locale";

export default function AccountDetails() {
    const { id } = useParams()
    const [account, setAccount] = useState(null)
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMembers()
    }, [])

    const getMembers = async () => {
        setLoading(true)
        await axiosClient.get(`/accounts/accountMembers/${id}`)
            .then(({ data }) => {
                setLoading(false)
                // console.log(data.data)
                setAccount(data.data[0].accountName)
                setMembers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <PageComponent
            heading={
                account + ' Details'
            }
        >
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-2 text-left">Member</th>
                        <th className="py-1 px-2 text-left">Folio</th>
                        <th className="py-1 px-2 text-right">Anual Principle</th>
                        <th className="py-1 px-2 text-right">Amount Paid</th>
                        <th className="py-1 px-2 text-right">Balance</th>
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
                        {members &&
                            members.map(member => (
                                <tr className="border-b border-gray-400" key={member.memberId}>
                                    <td className="py-0 px-2 text-left">
                                        <Link to={`/members/memberaccountdetails/${member.memberId}/${member.accountId}`}>
                                            {member.member}
                                        </Link>
                                    </td>
                                    {/* <td className="py-0 px-2 text-left">{'F' + member.accountOpeningYear + '-' + member.memberCode + '-' + member.accountCode}</td> */}
                                    <td className="py-0 px-2 text-left">{member.Folio}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.accountAnualPrinciple)}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.totalAmountPaid)}</td>
                                    {/* <td className="py-0 px-2 text-right">{CurrencyFormat(member.accountAnualPrinciple - member.totalAmountPaid)}</td> */}
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.accountBalance)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                }
            </table>
        </PageComponent>

    )
}
