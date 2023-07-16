import { useEffect, useState } from "react";
import PageComponent from "../../Components/Core/PageComponent";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MemberAccountpdf from "./PDFs/MemberAccountpdf";

export default function MemberAccountDetails() {
    const { member_id, account_id } = useParams()
    const [memberAccountDetails, setMemberAccountDetails] = useState([])
    const [accountOpeningYear, setAccountOpeningYear] = useState()
    const [member, setMember] = useState(null)
    const [account, setAccount] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchs, setSearchs] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        getMemberAccountDetails()
            .then(jsonData => {
                setLoading(false)
                setAccount(jsonData[0].accountName)
                setMember(jsonData[0].member)
                setAccountOpeningYear(jsonData[0].accountOpeningYear)
                setMemberAccountDetails(jsonData)
                return jsonData
            })
            .then(jsonData => {
                setSearchResults(jsonData)
            })
            .catch(() => setLoading(false))
    }, [])

    const getMemberAccountDetails = async () => {
        setLoading(true)
        const memberAccountDetailz = await axiosClient.get(`members/memberAccountDetails/${member_id}/${account_id}`)
        return memberAccountDetailz.data.data
    }

    /**
    * Search form
    */
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(memberAccountDetails)
        const searchArray = memberAccountDetails.filter(memberAccountDetail =>
            memberAccountDetail.txnDate.includes(searchs) ||
            memberAccountDetail.Folio.includes(searchs)
        )
        setSearchResults(searchArray)
        // console.log(searchs)
    }

    return (
        <PageComponent
            heading={
                member &&
                <div className="font-semibold capitalize text-green-700">
                    {member + '\'s ' + account + ' for Financial Year ' + accountOpeningYear}
                </div>
            }
            searchs={searchs}
            setSearchs={setSearchs}
            handleSearch={handleSearch}
        >
            <PDFDownloadLink document={<MemberAccountpdf memberAccountPdf={searchResults} member={member} account={account} accountYear={accountOpeningYear} />} fileName="MemberAccuontPDF">
                {({ loading }) => (loading ? <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Document Loading ...</button> : <button className="rounded-md bg-slate-300 shadow-lg px-2 py-1">Download PDF</button>)}
            </PDFDownloadLink>
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
                <tbody>
                    {loading ?
                        <tr>
                            <td className="mx-auto h-10 text-center bg-slate-200 space-x-2" colSpan="4">
                                Loading ...
                            </td>
                        </tr> :
                        (searchResults ?
                            searchResults.map(memberAccountDetail => (
                                <tr className="border-b border-gray-400" key={memberAccountDetail.txnId}>
                                    <td className="py-0 px-6 text-left">{DateFormat(memberAccountDetail.txnDate)}</td>
                                    {/* <td className="py-0 px-6 text-left">{memberAccountDetail.accountName}</td> */}
                                    {/* <td className="py-0 px-6 text-left">{'F' + memberAccountDetail.accountOpeningYear + '-' + memberAccountDetail.memberCode + '-' + memberAccountDetail.accountCode}</td> */}
                                    <td className="py-0 px-6 text-left">{memberAccountDetail.Folio}</td>
                                    {memberAccountDetail.event == 1 &&
                                        <>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(memberAccountDetail.Amount)}</td>
                                        </>
                                    }
                                    {memberAccountDetail.event == 2 &&
                                        <>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(memberAccountDetail.Amount)}</td>
                                            <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                                        </>
                                    }

                                </tr>
                            )) :
                            <tr>
                                <td colspan="4" className="text-red-500 text-center">
                                    No record in the database!!!
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </PageComponent >
    )
}
