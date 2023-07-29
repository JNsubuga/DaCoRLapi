import { useEffect, useState } from "react"
import PageComponent from "../../Components/Core/PageComponent"
import TButton from "../../Components/Core/TButton"
import axiosClient from "../../axiosClient"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../Contexts/ContextProvider"

export default function TransactionForm() {
    const { setNotification } = useStateContext()
    const { id } = useParams()
    const navigate = useNavigate()

    const [events, setEvents] = useState([])
    // const [errors, setErrors] = useState([])
    const [errors, setErrors] = useState(null)
    const [members, setMembers] = useState([])
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)

    const [transaction, setTransaction] = useState({
        id: null,
        txnDate: "",
        event_id: "",
        member_id: "",
        account_id: "",
        amount: ""

    })

    useEffect(() => {
        getAccounts()
        getEvents()
        getMembers()
    }, [])

    const getAccounts = (() => {
        axiosClient.get('/accounts')
            .then(({ data }) => {
                setAccounts(data.data)
            }).catch(() => { })
    })

    const getEvents = (() => {
        axiosClient.get('/events')
            .then(({ data }) => {
                // console.log(data.data)
                setEvents(data.data)
            })
            .catch(() => { })
    })

    const getMembers = (() => {
        axiosClient.get('/members')
            .then(({ data }) => {
                setMembers(data.data)
            }).catch(() => { })
    })

    if (id) {
        useEffect(() => {
            // setLoading(true)
            axiosClient.get(`/transaction/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setTransaction(data)
                })
                .catch(() => {
                    // setLoading(false)
                })
        }, [])
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (transaction.id) {
            try {
                await axiosClient.put(`/transactions/${transaction.id}`, transaction)
                    .then(() => {
                        setNotification("Transaction was successfully updated!!")
                        // navigate('/transactions')
                    })
            } catch (err) {
                if (err) {
                    setErrors(err)
                    console.log(errors)
                }

            }
        } else {
            // const res = await axiosClient.post('/transactions', transaction)
            await axiosClient.post('/transactions', transaction)
                .then(({ data }) => {
                    console.log(data.data.response)
                    setNotification("Transaction was successfully Stored!!")
                    // navigate('/transactions')
                })
                .catch(err => {
                    const response = err.response
                    console.log(err)
                    if (response && response.status === 422) {
                        console.log(err.Response)
                        // setErrors(response)
                    }
                })
            // return console.log(res.data)
        }
        // console.log(transaction)
    }

    return (
        <PageComponent
            heading="New Transaction"
        // heading={
        //     !transaction.id == null ?
        //         <div>New Transaction</div>
        //         : <div>Update Transaction</div>
        // }
        // buttonz={(
        //     <TButton to="/transactions" back>
        //         Transaction
        //     </TButton>
        // )}
        >
            {/* {errors &&
                <div>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            } */}

            {/* {loading && (
                <div>Loading ...</div>
            )} */}

            {/* {!loading && */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto items-center justify-between">
                {/* txnDate  */}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3 my-0 py-0">
                        {/* <div> */}
                        <label htmlFor="txnDate" className="mr-4 mt-4 text-lg">Date</label>
                    </div>
                    <div className="md:w-2/3 my-0 py-0">
                        {/* <div> */}
                        <input
                            id="txnDate"
                            type="date"
                            name="txnDate"
                            value={transaction.txnDate}
                            onChange={(ev) => setTransaction({ ...transaction, txnDate: ev.target.value })}
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                            autoFocus
                        />
                        {/* @error('txnDate')
                                <p className="text-red-500 text-xs italic">{{$message}}</p>
                            @enderror */}
                    </div>
                </div>

                {/* event_id */}
                <div className="md:flex md:items-center mb-2">
                    <div className="md:w-1/3 my-0 py-0">
                        <label htmlFor="event_id" className="mr-4 mt-4 text-lg">Event</label>
                    </div>
                    <div className="md:w-2/3 my-0 py-0">
                        <select
                            name="event_id"
                            id="event_id"
                            onChange={(ev) => setTransaction({ ...transaction, event_id: ev.target.value })}
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        >
                            <option defaultValue={""}>--Select Event--</option>
                            {events.map(selectItem => (
                                <option
                                    value={selectItem.id}
                                    key={selectItem.id}

                                >{selectItem.Event}</option>
                            ))}
                        </select>
                        {/* @error('event_id')
                        <p className="text-red-500 text-xs italic">{{ $message }}</p>
                        @enderror */}
                    </div>
                </div>

                {/* member_id */}
                <div className="md:flex md:items-center mb-2">
                    <div className="md:w-1/3 my-0 py-0">
                        <label htmlFor="member_id" className="mr-4 mt-4 text-lg">Member</label>
                    </div>
                    <div className="md:w-2/3 my-0 py-0">
                        <select
                            name="member_id"
                            id="member_id"
                            onChange={(ev) => setTransaction({ ...transaction, member_id: ev.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        >
                            <option defaultValue={""}>--Select Member--</option>
                            {members.map(selectItem => (
                                <option
                                    value={selectItem.id}
                                    key={selectItem.id}
                                >{selectItem.Names}</option>
                            ))}
                        </select>
                        {/* @error('member_id')
                        <p className="text-red-500 text-xs italic">{{ $message }}</p>
                        @enderror */}
                    </div>
                </div>

                {/* account_id */}
                <div className="md:flex md:items-center mb-2">
                    <div className="md:w-1/3 my-0 py-0">
                        <label htmlFor="account_id" className="mr-4 mt-4 text-lg">Account</label>
                    </div>
                    <div className="md:w-2/3 my-0 py-0">
                        <select
                            name="account_id"
                            id="account_id"
                            onChange={(ev) => setTransaction({ ...transaction, account_id: ev.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        >
                            <option defaultValue={""}>--Select Account--</option>
                            {accounts.map(selectItem => (
                                <option
                                    value={selectItem.id}
                                    key={selectItem.id}
                                >{selectItem.year + '-' + selectItem.Code}</option>
                            ))}
                        </select>
                        {/* @error('account_id')
                        <p className="text-red-500 text-xs italic">{{ $message }}</p>
                        @enderror */}
                    </div>
                </div>

                {/* amount  */}
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3 my-0 py-0">
                        <label htmlFor="amount" className="mr-4 mt-4 text-lg">Amount</label>
                    </div>
                    <div className="md:w-2/3 my-0 py-0">
                        <input
                            id="amount"
                            type="number"
                            name="amount"
                            onChange={(ev) => setTransaction({ ...transaction, amount: ev.target.value })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                        />
                        {/* @error('amount')
                        <p className="text-red-500 text-xs italic">{{ $message }}</p>
                        @enderror */}
                    </div>
                </div>

                {/* <div className="flex items-center justify-between mt-4">
                        <button className="ml-3 bg-gray-600 hover:bg-gray-500" type="reset">
                            Cancel
                        </button> */}
                {transaction.id == null ?

                    <TButton color="green">
                        Store Record
                    </TButton> :
                    <TButton color="green">
                        Update Record
                    </TButton>
                }
                {/*<TButton color="green">Store Record</TButton>
                     </div> */}
            </form>
            {/* } */}
        </PageComponent>
    )
}
