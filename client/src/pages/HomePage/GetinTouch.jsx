import React from 'react'

const GetinTouch = () => {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white">
            {/* Left: Google Map */}
            <div className="w-full md:w-1/2 h-[400px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8882886054257!2d80.59732582334217!3d7.2535532722490785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3697e99775b2f%3A0xa2ac4030a1f9e5be!2sDepartment%20of%20Psychology!5e0!3m2!1sen!2slk!4v1761794353292!5m2!1sen!2slk"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                    title="Google Map"
                ></iframe>
            </div>

            {/* Right: Unique Info Section */}
            <div
                className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-6 md:p-10"
                style={{ backgroundColor: '#560606', color: 'white' }}
            >
                <h2 className="text-2xl font-semibold mb-3 tracking-wide uppercase">
                    Let’s Connect Differently
                </h2>
                <p className="text-sm mb-5 max-w-md">
                    We believe every great idea starts with a spark.
                    Drop your thoughts, collaborations, or creative visions — and let’s build something meaningful together.
                </p>

                <div className="flex gap-3 mt-2">
                    <button className="bg-white text-[#560606] px-5 py-2 text-sm font-semibold rounded-md hover:bg-gray-100 transition">
                        Book an Appointment
                    </button>
                </div>

            </div>
        </div>
    )
}

export default GetinTouch
