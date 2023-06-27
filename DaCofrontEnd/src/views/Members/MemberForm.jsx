import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosClient from "../../axiosClient"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"

export default function MemberForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const { setNotification } = useStateContext()

    const [member, setMember] = useState({
        id: null,
        Names: '',
        Code: '',
        Contacts: '',
        currentBalance: 0
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/members/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setMember(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (member.id) {
            try {
                await axiosClient.put(`/members/${member.id}`, member)
                    .then(() => {
                        setNotification("Member was successfully Updated!!")
                        navigate('/members')
                    })
                    .catch((err) => {
                        const response = err.response
                        if (response && response.status === 422) {
                            setErrors(response.data.errors)
                        }
                    })
            } catch (err) {
                console.log(err.response)
            }

        } else {
            await axiosClient.post('/members', member)
                .then(() => {
                    setNotification("Member was successfully Registered!!")
                    navigate('/members')
                })
                .catch((err) => {
                    const response = err.response
                    if (response && response.status === 422) {

                        setErrors(response.data.errors)
                    }
                })
        }
    }
    return (
        <PageComponent
            heading={
                !member.id == true ?
                    <div>New Member</div> :
                    <div>Update Member: {member.Names}</div>
            }
            buttonz={
                <TButton to="/members" back>
                    Members List
                </TButton>
            }>

            {errors &&
                <div>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }

            {loading && (
                <div>Loading ...</div>
            )}

            {!loading &&
                <form onSubmit={handleSubmit} className="grid grid-cols-1 space-y-2 p-4 max-w-xl items-center bg-slate-100 mx-auto rounded-lg">
                    <input
                        name="Names"
                        type="text"
                        value={member.Names}
                        onChange={(ev) => setMember({ ...member, Names: ev.target.value })}
                        placeholder="FirstName SurName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="Code"
                        type="text"
                        value={member.Code}
                        onChange={(ev) => setMember({ ...member, Code: ev.target.value })}
                        placeholder="Member Code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="Contacts"
                        type="text"
                        value={member.Contacts}
                        onChange={(ev) => setMember({ ...member, Contacts: ev.target.value })}
                        placeholder="Phone Contact"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    <input
                        name="Contacts"
                        type="hidden"
                        value={member.currentBalance}
                        onChange={(ev) => setMember({ ...member, currentBalance: ev.target.value })}
                    // placeholder="Phone Contact"
                    // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                    {!member.id == true ?
                        <TButton color="green">
                            Store Record
                        </TButton> :
                        <TButton color="green">
                            Update Record
                        </TButton>
                    }
                </form>
            }
        </PageComponent>
    )
}