import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
// import { useStateContext } from "../../Contexts/ContextProvider";
import axiosClient from "../../axiosClient";
import { Link, useParams } from "react-router-dom";

export default function MemberAcounts() {
    const { id } = useParams()
    const [memberAccounts, setMemberAccounts] = useState([])
    const [loading, setLoading] = useState(false)
    // const { setNotification } = useStateContext()

    useEffect(() => {
        getMemberAccounts()
    }, [])
    const getMemberAccounts = async () => {
        await axiosClient.get(`/members/memberAccounts/${id}`)
            .then(({ data }) => {
                console.log(data.data)
                // setMemberAccounts(data.data)
                // setLoading(false)
            })
            .catch((err) => {
                console.log(err.response)
                setLoading(false)
            })

    }
    return (
        <PageComponent
            heading="Members Accounts"
        >
            {loading &&
                <div className="text-center">
                    Loading ...
                </div>
            }
            {!loading &&
                <div>
                    {/* {memberAccounts[0].member == null ?
                        <h1 class="text-red-500 capitalize">
                            No member name Record found in the database!!!
                        </h1> :
                        <h1 class="font-bold uppercase text-green-700">
                            {'Member: ' + memberAccounts[0].member}
                        </h1>
                    } */}
                    <table className="table-auto w-full mt-2">
                        <thead>
                            <tr className="border-b-4 border-gray-400 font-bold capitalize">
                                <th className="py-1 px-6 text-left">Account</th>
                                <th className="py-1 px-6 text-left">Folio</th>
                                <th className="py-1 px-6 text-right">Anual Principle</th>
                                <th className="py-1 px-6 text-right">Amount Paid</th>
                                <th className="py-1 px-6 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberAccounts.map(account => (
                                <tr className="border-b-2 border-gray-300">
                                    <td className="py-0 px-6 text-left">
                                        <Link to={`members/${account.member_id}/${account.account_id}`}>{account.Name}</Link>
                                    </td>
                                    <td className="py-0 px-6 text-left">{'F' + account.year + '-' + account.member_Code + '-' + account.Code}</td>
                                    <td className="py-0 px-6 text-right">{account.AnualPrinciple}</td>
                                    <td className="py-0 px-6 text-right">{account.totalAmountPaid}</td>
                                    <td className="py-0 px-6 text-right">{account.AnualPrinciple - account.totalAmountPaid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </PageComponent>
    )
}
