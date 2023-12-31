import { useEffect, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosClient from "../../axiosClient"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function Members() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const [searchs, setSearchs] = useState("")
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        getMembers()
            .then(jsonData => {
                setLoading(false)
                setMembers(jsonData)
                return jsonData
            })
            .then(jsonData => {
                setSearchResults(jsonData)
            })
            .catch(err => {

            })
    }, [])

    const handleDelete = async (member) => {
        if (!window.confirm('Are you sure you want to delete this Account?')) {
            return
        }
        try {
            await axiosClient.delete(`/members/${member.id}`)
                .then(() => {
                    setNotification("Account was successfully Deleted!!")
                    getMembers()
                })
                .catch((err) => {
                    const response = err.response
                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getMembers = (async () => {
        setLoading(true)
        const memberz = await axiosClient.get('/members')
        return memberz.data.data
    })

    /**
    * Search form
    */
    const handleSearch = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(members)
        const searchArray = members.filter(member =>
            member.Names.includes(searchs) ||
            member.Code.includes(searchs) ||
            member.Contacts.includes(searchs)
        )
        setSearchResults(searchArray)
        // console.log(searchs)
    }
    return (
        <PageComponent
            heading={
                <div className="font-semibold capitalize text-green-700">
                    Members List
                </div>
            }
            searchs={searchs}
            setSearchs={setSearchs}
            handleSearch={handleSearch}

            buttonz={(
                <TButton color="green" to="/members/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    Register Member
                </TButton>
            )}>
            <div className="max-w-full grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
                {loading ?
                    <div className="mx-auto h-10 text-center bg-slate-200 space-x-2">
                        Loading ...
                    </div> :
                    searchResults ?
                        searchResults.map(member => (
                            <div className="rounded-xl border border-green-600 p-2 shadow-lg m-1" key={member.id}>
                                <div className="flex">
                                    <h1 className="w-3/4 border-b-2 border-gray-500 font-bold capitalize">
                                        <Link to={`/members/membertransactiondetails/${member.id}`}>{member.Names}</Link>

                                    </h1>
                                    <span className="w-1/4 border-b-2 border-gray-500 font-bold capitalize text-blue-500 bg-slate-300 m-px rounded text-center px-1 mx-auto">
                                        <Link to={`/members/memberaccounts/${member.id}`}>Acounts</Link>
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <div className="flex relative">
                                        <p className="absolute left-0">Member's Code:</p> <p className="absolute right-0 text-green-700 font-extrabold">{member.Code}</p>
                                    </div>
                                    <div className="flex relative mt-5">
                                        <p className="absolute left-0">Member's Contacts:</p> <p className="absolute right-0">{member.Contacts}</p>
                                    </div>
                                </div>

                                <div className="flex relative mt-6 items-center justify-between">
                                    <TButton color="orange" to={'/members/' + member.id + '/edit'}>
                                        <PencilIcon className="h-6 w-6 mr-1" />
                                        Edit
                                    </TButton>
                                    <TButton color="red" onClick={() => handleDelete(member)}>
                                        <TrashIcon className="h-6 w-6 mx-auto" />
                                    </TButton>
                                </div>
                            </div>
                        )) :
                        <div className="text-red-500 text-center">
                            No record in the database!!!
                        </div>
                }
            </div>
        </PageComponent>
    )
}
