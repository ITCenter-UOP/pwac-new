import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateAppointment = () => {
    const { id } = useParams()
    return (
        <div>UpdateAppointment</div>
    )
}

export default UpdateAppointment