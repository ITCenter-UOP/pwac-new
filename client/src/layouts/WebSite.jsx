import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNav from '../component/Nav/TopNav'
import Nav from '../component/Nav/Nav'
import Menubar from '../component/Nav/Menubar'
import MainFooter from '../component/Footers/MainFooter'

const WebSite = () => {
    const [showTopSection, setShowTopSection] = useState(true)
    const sentinelRef = useRef(null)

    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver(
                ([entry]) => {
                    // When scrolled past the sentinel, hide top section
                    setShowTopSection(entry.isIntersecting)
                },
                { root: null, threshold: 0 }
            )
            io.observe(sentinel)
            return () => io.disconnect()
        } else {
            // Fallback for older browsers
            const onScroll = () => setShowTopSection(window.scrollY <= 200)
            window.addEventListener('scroll', onScroll, { passive: true })
            onScroll()
            return () => window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <div className="relative">
            {/* Invisible sentinel to detect scroll */}
            <div
                ref={sentinelRef}
                style={{ position: 'absolute', top: 120, left: 0, width: 1, height: 1, pointerEvents: 'none' }}
                aria-hidden="true"
            />

            {/* Top section (TopNav + Nav) only visible at top */}
            {showTopSection && (
                <div className="fixed w-full top-0 z-50 bg-white shadow-sm transition-all duration-300">
                    <TopNav />
                    <Nav />
                </div>
            )}

            {/* Menubar: stays fixed, moves up when top section hides */}
            <div
                className={`fixed w-full z-40 transition-all duration-300 ${
                    showTopSection ? 'top-[150px]' : 'top-0 shadow-md'
                }`}
            >
                <Menubar />
            </div>

            {/* Main content area */}
            <div className="pt-[210px]">
                <Outlet />
            </div>

            <MainFooter />
        </div>
    )
}

export default WebSite
