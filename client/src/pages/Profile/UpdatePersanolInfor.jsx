import React, { useState } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import DefaultInput from "../../component/Form/DefaultInput";
import TextAreaInput from "../../component/Form/TextAreaInput";
import useForm from "../../hooks/useForm";
import API from "../../services/api";
import Toast from "../../component/Toast/Toast";

const UpdatePersonalInfor = () => {
    const token = localStorage.getItem("token");

    const { values, handleChange } = useForm({
        address: "",
        contact: "",
        desc: "",
        expertise: ""
    });

    const [toastData, setToastData] = useState({ show: false, success: false, message: "" });
    const [isUpdating, setIsUpdating] = useState(false);

    const showToast = (success, message) => {
        setToastData({ show: true, success, message });
        setTimeout(() => setToastData({ show: false, success: false, message: "" }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const contactArray = values.contact
            .split(",")
            .map(num => num.trim())
            .filter(num => num);

        const payload = { ...values, contact: contactArray };

        try {
            const res = await API.post("/member/update-personal-infor", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success === true) {
                showToast(true, res.data.message);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                showToast(false, res.data?.message);
            }
        } catch (err) {
            console.error(err);
            showToast(false, "Something went wrong while updating information.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-white p-6 mt-8 rounded-md shadow-md border border-purple-200 mx-auto">
            <h1 className="text-lg font-bold mb-4 text-purple-800">Update Personal Information</h1>

            {toastData.show && (
                <div className="fixed top-5 right-5 z-50">
                    <Toast success={toastData.success} message={toastData.message} onClose={() => setToastData({ ...toastData, show: false })} />
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <DefaultInput
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                />

                <DefaultInput
                    label="Contact Numbers"
                    name="contact"
                    value={values.contact}
                    onChange={handleChange}
                    placeholder="Enter numbers separated by commas, e.g. 0771234567,0719876543"
                />

                <TextAreaInput
                    label="Description"
                    name="desc"
                    value={values.desc}
                    onChange={handleChange}
                    placeholder="Write something about yourself"
                />

                <DefaultInput
                    label="Expertise"
                    name="expertise"
                    value={values.expertise}
                    onChange={handleChange}
                    placeholder="Your area of expertise"
                />

                <DefaultButton
                    type="submit"
                    label={isUpdating ? "Updating..." : "Update Information"}
                    className="w-full mt-4"
                    disabled={isUpdating}
                />
            </form>
        </div>
    );


};

export default UpdatePersonalInfor;
