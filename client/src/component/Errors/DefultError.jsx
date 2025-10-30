import React from 'react';

const DefultError = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-screen bg-[#fff0f0]">
            <h1 className="text-9xl font-extrabold text-[#560606] animate-pulse">404</h1>
            <h2 className="mt-4 text-3xl font-semibold tracking-wider text-[#560606]">
                Oops! Page Not Found
            </h2>
            <p className="mt-2 text-gray-600">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <a href="/" className="mt-8">
                <div className="py-3 px-8 bg-[#560606] text-white rounded-full shadow-md hover:bg-[#3f0303] hover:shadow-lg hover:scale-105 transition duration-300">
                    Go Back Home
                </div>
            </a>
        </div>
    );
};

export default DefultError;
