import React, { useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import loginImg from '../../assets/Quoteimg.jpg';

const Login = () => {
    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Email: ${values.email}\nPassword: ${values.password}`);
        setValues({ email: '', password: '' });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#fff0f0] to-[#fef8f8] p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

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

                        <button
                            type="submit"
                            className="w-full bg-[#560606] text-white py-3 rounded-xl font-bold hover:bg-[#3f0303] transition-all shadow-md hover:shadow-lg"
                        >
                            Sign In
                        </button>

                        <div className="flex justify-between mt-3 text-sm text-gray-500">
                            <span className="hover:text-[#560606] cursor-pointer transition">Forgot Password?</span>
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
