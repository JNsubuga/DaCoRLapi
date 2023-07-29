import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
import axiosClient from "../../axiosClient";
import { Link, useParams } from "react-router-dom";
import { CurrencyFormat } from "../../Components/Core/Locale";
import TButton from "../../Components/Core/TButton";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MemberAccountspdf from "./PDFs/MemberAccountspdf";
import Acummulator from "../../Components/Core/Acummulator";

export default function MemberAccounts() {
    const { id } = useParams()
    const [memberAccounts, setMemberAccounts] = useState([])
    const [member, setMember] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchs, setSearchs] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [numbersToAcummulate, setNumbersToAcummulate] = useState({})

    useEffect(() => {
        getMemberAccounts()
            .then(jsonData => {
                setLoading(false)
                setMember(jsonData[0].member)
                setMemberAccounts(jsonData)
                return jsonData
            })
            .then(jsonData => {
                setSearchResults(jsonData)
                setNumbersToAcummulate(jsonData)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])

    const getMemberAccounts = async () => {
        const memberAccountc = await axiosClient.get(`/members/memberAccounts/${id}`)
        return memberAccountc.data.data
    }

    /**
    * Search form
    */
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(memberAccounts)
        const searchArray = memberAccounts.filter(memberAccount =>
            memberAccount.accountName.includes(searchs) ||
            memberAccount.Folio.includes(searchs)
        )
        setSearchResults(searchArray)
    }

    return (
        <PageComponent
            heading={member &&
                <div className="font-semibold capitalize text-green-700">
                    {member + '\'s accounts'}
                </div>
            }
            searchs={searchs}
            setSearchs={setSearchs}
            handleSearch={handleSearch}
            buttonz={(
                <TButton to="/members" back>
                    Members List
                </TButton>
            )}
        >
            <PDFDownloadLink
                document={
                    <MemberAccountspdf
                        memberAccountsPdf={searchResults}
                        member={member}
                    />
                }
                fileName="MemberAccuontsPDF">
                {({ loading }) => (loading ? <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Document Loading ...</button> : <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Download PDF</button>)}
            </PDFDownloadLink>

            {/* <div> */}
            <table className="table-auto w-full mt-2">
                <thead>
                    <tr className="border-b-2 border-gray-600 font-bold capitalize">
                        <th className="py-1 px-2 text-left">Account</th>
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
                            searchResults.map(account => (
                                < tr className="border-b border-gray-400" key={account.accountId} >
                                    <td className="py-0 px-2 text-left">
                                        <Link to={`/members/memberaccountdetails/${account.memberId}/${account.accountId}`}>{account.accountName}</Link>
                                    </td>
                                    <td className="py-0 px-2 text-left">{account.Folio}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(account.accountAnualPrinciple)}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(account.totalAmountPaid)}</td>
                                    <td className="py-0 px-2 text-right">{CurrencyFormat(account.accountBalance)}</td>
                                </tr>
                            )) :
                            <tr>
                                <td colspan="5" className="text-red-500 text-center">
                                    No record in the database!!!
                                </td>
                            </tr>
                        )
                    }
                    <Acummulator objectValuesToAcummulate={numbersToAcummulate} />
                </tbody>
            </table>
            {/* </div> */}
        </PageComponent >
    )
}
