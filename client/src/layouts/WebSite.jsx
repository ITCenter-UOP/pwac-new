import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../component/Nav/TopNav'
import Nav from '../component/Nav/Nav'
import Menubar from '../component/Nav/Menubar'
import MainFooter from '../component/Footers/MainFooter'

const WebSite = () => {
    return (
        <div className=''>
            <div className="">
                <TopNav />
                <Nav />
                <Menubar />
            </div>
            <div className="">
                <Outlet />
            </div>
            <div className="">
                <MainFooter />
            </div>
        </div>
    )
}

export default WebSite