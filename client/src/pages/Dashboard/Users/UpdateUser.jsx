import React from 'react'
import { useParams } from 'react-router-dom'


const UpdateUser = () => {
    const {id} = useParams()
    return (
        <div>UpdateUser </div>
    )
}

export default UpdateUser