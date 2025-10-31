import React, { useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import loginImg from '../../assets/Quoteimg.jpg';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../../component/Toast/Toast';
import DefaultButton from '../../component/Buttons/DefaultButton';
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
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

        if (!values.email || !values.password) {
            showToast(false, "All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await API.post('/auth/login', values, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.data.success === true) {
                showToast(true, res.data.message);
                login(res.data.token);
                const decoded = jwtDecode(res.data.token);
                const role = decoded?.role;

                if (role === "admin") {
                    setTimeout(() => navigate('/Dashboard'), 2000);
                } else if (role === "user") {
                    setTimeout(() => navigate('/my-account'), 2000);
                } else {
                    setTimeout(() => navigate('/'), 2000);
                }
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
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                {toastData.show && (
                    <div className="fixed top-200 right-5 z-50">
                        <Toast
                            success={toastData.success}
                            message={toastData.message}
                            onClose={() => setToastData({ ...toastData, show: false })}
                        />
                    </div>
                )}
                {/* Image Side */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img src={loginImg} alt="Login" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-[#560606]/20"></div>
                </div>

                {/* Form Side */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-[#560606] mb-10 text-center">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <DefaultInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        <DefaultInput
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />

                        <DefaultButton
                            type='submit'
                            label={loading ? 'Signing...' : 'Login'}
                            disabled={loading}
                        />

                        <div className="flex justify-between mt-3 text-sm text-gray-500">
                            <span className="hover:text-[#560606] cursor-pointer transition">
                                <a href="/forget-password">
                                    Forgot Password?
                                </a>
                            </span>
                            <span className="hover:text-[#560606] cursor-pointer transition">
                                <a href="/create-account">
                                    Sign Up
                                </a>
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
