import React from 'react'
import { useParams } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'


const UpdateUser = () => {
    const { id } = useParams()
    return (
        <div>
            <div className="-mt-0">
                <a href="/Dashboard/manage-users">
                    <DefaultButton
                        type='button'
                        label='Back to Manage Users'
                    />
                </a>
            </div>
        </div>
    )
}

export default UpdateUser