import React from 'react'
import ImageSlider from './ImageSlider'
import AboutUsHome from './AboutUsHome'
import Quotes from './Quotes'
import NEWS from './NEWS'
import GetinTouch from './GetinTouch'

const HomePage = () => {
    return (
        <div>
            <ImageSlider />
            <AboutUsHome />
            <Quotes />
            <div className="mt-0">
                <NEWS />
            </div>
            <div className="">
                <GetinTouch />
            </div>
        </div>
    )
}

export default HomePage