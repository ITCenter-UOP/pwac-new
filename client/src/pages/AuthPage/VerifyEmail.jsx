import React, { useEffect, useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import signupImg from '../../assets/Quote2img.jpg';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../../component/Toast/Toast';
import DefaultButton from '../../component/Buttons/DefaultButton';

const VerifyEmail = () => {
    const token = localStorage.getItem('emailverify')
    const navigate = useNavigate();
    const { verifyEmailInfo, handleEmailVerificationToken } = useAuth()

    useEffect(() => {
        if (!token) {
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!verifyEmailInfo.email && token) {
            try {
                handleEmailVerificationToken(token);
            } catch (err) {
                localStorage.clear();
                navigate('/');
            }
        }
    }, [verifyEmailInfo, token, handleEmailVerificationToken, navigate]);

    const [values, setValues] = useState({ otp: '' });

    const [toastData, setToastData] = useState({ show: false, success: false, message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!values.otp) {
            showToast(false, "All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await API.post('/auth/verify-email', values, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (res.data.success === true) {
                showToast(true, res.data.message);
                setTimeout(() => {
                    navigate('/login');
                    localStorage.removeItem('emailverify'); 
                }, 2000);
            } else {
                showToast(false, res.data.message);
            }
        } catch (err) {
            const message =
                err.response?.data?.message || "Request failed. Please try again.";
            console.log("Axios Error:", err.response || err.message);
            showToast(false, message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#fff0f0] to-[#fef8f8] p-4">
            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast
                        success={toastData.success}
                        message={toastData.message}
                        onClose={() => setToastData({ ...toastData, show: false })}
                    />
                </div>
            )}

            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Form Side */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-[#560606] mb-10 text-center md:text-left">
                        Verify Your Email
                    </h2>
                    <p className="text-red-500 mb-4">
                        The OTP already send to Email that you Provided when you Signup
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <DefaultInput
                            label="Enter OTP"
                            type="text"
                            name="otp"
                            value={values.otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            required
                        />

                        <DefaultButton
                            type='submit'
                            label={loading ? 'Verifying Email...' : 'Verify Email'}
                            disabled={loading}
                        />

                    </form>
                </div>

                {/* Image Side */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img
                        src={signupImg}
                        alt="Signup"
                        className="object-cover w-full h-full rounded-r-3xl"
                    />
                    <div className="absolute inset-0 bg-[#560606]/20 rounded-r-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
