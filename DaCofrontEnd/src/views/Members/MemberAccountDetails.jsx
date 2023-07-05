import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale";

export default function MemberAccountDetails() {
    const { member_id, account_id } = useParams()
    const [memberAccountDetails, setMemberAccountDetails] = useState([])
    const [accountOpeningYear, setAccountOpeningYear] = useState()
    const [member, setMember] = useState(null)
    const [account, setAccount] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMemberAccountDetails()
    }, [])

    const getMemberAccountDetails = async () => {
        setLoading(true)
        await axiosClient.get(`members/memberAccountDetails/${member_id}/${account_id}`)
            .then(({ data }) => {
                // console.log(data.data)
                setLoading(false)
                setAccount(data.data[0].accountName)
                setMember(data.data[0].member)
                setAccountOpeningYear(data.data[0].accountOpeningYear)
                setMemberAccountDetails(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <PageComponent heading={
            member &&
            <div className="font-semibold capitalize text-green-700">
                {member + '\'s ' + account + ' for Financial Year ' + accountOpeningYear}
            </div>
        }>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-6 text-left">Value-Date</th>
                        {/* <th className="py-1 px-6 text-left">Account</th> */}
                        <th className="py-1 px-6 text-left">Folio</th>
                        <th className="py-1 px-6 text-right">Dr</th>
                        <th className="py-1 px-6 text-right">Cr</th>
                    </tr>
                </thead>
                {loading &&
                    <tbody>
                        <tr>
                            <td className="mx-auto h-10 text-center bg-slate-200 space-x-2" colSpan="4">
                                Loading ...
                            </td>
                        </tr>

                    </tbody>
                }
                {!loading &&
                    <tbody>
                        {memberAccountDetails &&
                            memberAccountDetails.map(memberAccountDetail => (
                                <tr className="border-b border-gray-400" key={memberAccountDetail.txnId}>
                                    <td className="py-0 px-6 text-left">{DateFormat(memberAccountDetail.txnDate)}</td>
                                    {/* <td className="py-0 px-6 text-left">{memberAccountDetail.accountName}</td> */}
                                    <td className="py-0 px-6 text-left">{'F' + memberAccountDetail.accountOpeningYear + '-' + memberAccountDetail.memberCode + '-' + memberAccountDetail.accountCode}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(memberAccountDetail.Dr)}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(memberAccountDetail.Cr)}</td>
                                </tr>
                            ))

                        }
                    </tbody>
                }
                {!memberAccountDetails &&
                    <tbody>
                        <tr>
                            <td colspan="5" className="text-red-500">
                                No transaction record found in the database!!!
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </PageComponent>
    )
}
