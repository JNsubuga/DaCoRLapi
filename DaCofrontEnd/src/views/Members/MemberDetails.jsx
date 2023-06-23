import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"
import { useParams } from "react-router-dom"

export default function MemberDetails() {
    const { id } = useParams()
    const [user, setUser] = useState([])
    useEffect(() => {
        axiosClient.get(`/members/${id}`)
            .then(({ data }) => {
                console.log(data.data)
            })
    }, [])
    return (

        <div>Member Details</div>
    )
}
