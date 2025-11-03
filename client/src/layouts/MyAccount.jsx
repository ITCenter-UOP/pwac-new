import React from 'react'
import { Outlet } from 'react-router-dom'

const MyAccount = () => {
    return (
        <div>
            <div className="">
                navbar
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                Footer
            </div>
        </div>
    )
}

export default MyAccount