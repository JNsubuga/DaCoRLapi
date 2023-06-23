import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStateContext } from "../../Contexts/ContextProvider"
import axiosClient from "../../axiosClient"

export default function AccountForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState()
    const [errors, setErrors] = useState()
    const { setNotification } = useStateContext()

    const [account, setAccount] = useState({
        id: null,
        Name: '',
        year: '',
        Code: '',
        AnualPrinciple: ''
    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/accounts/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setAccount(data.data)
                })
        })
    }
    return (
        <div>Account Form</div>
    )
}
