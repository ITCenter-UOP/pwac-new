import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Toast = ({ success, message, onClose }) => {
    // Auto-close after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = success ? (
        <FaCheckCircle className="text-green-500 w-5 h-5" />
    ) : (
        <FaTimesCircle className="text-red-500 w-5 h-5" />
    );

    const bgColor = success
        ? "bg-green-100 dark:bg-green-800"
        : "bg-red-100 dark:bg-red-800";

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-700 bg-white rounded-xl shadow-md transform transition-all duration-300 ease-in-out animate-fade-in`}
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${bgColor}`}
            >
                {icon}
            </div>
            <div className="ms-3 text-sm font-medium">{message}</div>
            <button
                onClick={onClose}
                type="button"
                className="ms-auto bg-transparent text-gray-400 hover:text-gray-700 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8"
                aria-label="Close"
            >
                <FaTimes className="w-3 h-3" />
            </button>
        </div>
    );
};

export default Toast;
