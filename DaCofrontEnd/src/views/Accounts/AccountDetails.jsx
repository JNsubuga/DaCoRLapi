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
    const [searchs, setSearchs] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        getMembers()
            .then(jsonData => {
                setLoading(false)
                setAccount(jsonData[0].accountName)
                setMembers(jsonData)
                return jsonData
            })
            .then(jsonData => {
                setSearchResults(jsonData)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    const getMembers = async () => {
        setLoading(true)
        const memberz = await axiosClient.get(`/accounts/accountMembers/${id}`)
        return memberz.data.data
    }
    /**
    * Search form
    */
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(members)
        const searchArray = members.filter(member =>
            member.member.includes(searchs) ||
            member.Folio.includes(searchs)
        )
        setSearchResults(searchArray)
        // console.log(searchs)
    }
    return (
        <PageComponent
            heading={
                account + ' Details'
            }
            searchs={searchs}
            setSearchs={setSearchs}
            handleSearch={handleSearch}
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
                <tbody>
                    {loading ?
                        <tr>
                            <td colSpan="5" className="text-center">
                                Loading ...
                            </td>
                        </tr> :
                        (searchResults ?
                            searchResults.map(member => (
                                <tr className="border-b border-gray-400" key={member.memberId}>
                                    <td className="py-0 px-2 text-left">
                                        <Link to={`/members/memberaccountdetails/${member.memberId}/${member.accountId}`}>
                                            {member.member}
                                        </Link>
                                    </td>
                                    <td className="py-0 px-2 text-left">{member.Folio}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.accountAnualPrinciple)}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.totalAmountPaid)}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(member.accountBalance)}</td>
                                </tr>
                            )) :
                            <td colspan="5" className="text-red-500 text-center">
                                No record in the database!!!
                            </td>
                        )
                        // }
                    }
                </tbody>
            </table>
        </PageComponent>

    )
}
