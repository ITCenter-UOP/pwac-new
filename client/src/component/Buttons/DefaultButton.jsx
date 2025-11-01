import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`py-4 px-8 bg-[#560606] text-white py-3 rounded-xl font-bold hover:bg-[#3f0303] transition-all shadow-md hover:shadow-lg
                ${disabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#3f0303] to-[#3f0303] hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#3f0303] focus:ring-offset-2'}
            `}
        >
            {label}
        </button>
    );
};

export default DefaultButton;
