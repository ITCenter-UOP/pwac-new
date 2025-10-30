import React, { useState } from 'react';
import DefaultInput from '../../component/Form/DefaultInput';
import signupImg from '../../assets/Quote2img.jpg';

const CreateAccount = () => {
    const [values, setValues] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Username: ${values.username}\nEmail: ${values.email}\nPassword: ${values.password}`);
        setValues({ username: '', email: '', password: '' });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#fff0f0] to-[#fef8f8] p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Form Side */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-[#560606] mb-10 text-center md:text-left">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <DefaultInput
                            label="Username"
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />

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
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Image Side */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img src={signupImg} alt="Signup" className="object-cover w-full h-full rounded-r-3xl" />
                    <div className="absolute inset-0 bg-[#560606]/20 rounded-r-3xl"></div>
                </div>

            </div>
        </div>
    );
};

export default CreateAccount;
