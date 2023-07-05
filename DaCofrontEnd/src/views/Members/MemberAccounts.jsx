import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
// import { useStateContext } from "../../Contexts/ContextProvider";
import axiosClient from "../../axiosClient";
import { Link, useParams } from "react-router-dom";
import { CurrencyFormat } from "../../Components/Core/Locale";
import TButton from "../../Components/Core/TButton";

export default function MemberAccounts() {
    const { id } = useParams()
    const [memberAccounts, setMemberAccounts] = useState([])
    const [member, setMember] = useState(null)
    const [loading, setLoading] = useState(false)
    // const { setNotification } = useStateContext()

    useEffect(() => {
        getMemberAccounts()
    }, [])
    const getMemberAccounts = async () => {
        await axiosClient.get(`/members/memberAccounts/${id}`)
            .then(({ data }) => {
                // console.log(data.data)
                setMember(data.data[0].member)
                setMemberAccounts(data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })

    }
    return (
        <PageComponent
            heading={member &&
                <div className="font-semibold capitalize text-green-700">
                    {member + '\'s accounts'}
                </div>
            }
            buttonz={(
                <TButton to="/members" back>
                    Members List
                </TButton>
            )}
        >


            <div>
                <table className="table-auto w-full mt-2">
                    <thead>
                        <tr className="border-b-2 border-gray-600 font-bold capitalize">
                            <th className="py-1 px-6 text-left">Account</th>
                            <th className="py-1 px-6 text-left">Folio</th>
                            <th className="py-1 px-6 text-right">Anual Principle</th>
                            <th className="py-1 px-6 text-right">Amount Paid</th>
                            <th className="py-1 px-6 text-right">Balance</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading ...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {memberAccounts && memberAccounts.map(account => (
                                <tr className="border-b border-gray-400" key={account.accountId}>
                                    <td className="py-0 px-6 text-left">
                                        <Link to={`/members/memberaccountdetails/${account.memberId}/${account.accountId}`}>{account.accountName}</Link>
                                    </td>
                                    <td className="py-0 px-6 text-left">{'F' + account.accountOpeningYear + '-' + account.memberCode + '-' + account.accountCode}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(account.accountAnualPrinciple)}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(account.totalAmountPaid)}</td>
                                    <td className="py-0 px-6 text-right">{CurrencyFormat(account.accountAnualPrinciple - account.totalAmountPaid)}</td>
                                </tr>
                            ))}
                            {!memberAccounts &&
                                <tbody>
                                    < tr ><td colspan="5" className="text-red-500 text-center">No record in the database!!!</td></tr >
                                </tbody>
                            }
                        </tbody>}
                </table>
            </div>


        </PageComponent>
    )
}
