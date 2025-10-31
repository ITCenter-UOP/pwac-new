import React from 'react'
import API from '../../services/api'
import FileInput from '../../component/Form/FileInput'
import DefaultButton from '../../component/Buttons/DefaultButton'
import useForm from '../../hooks/useForm'

const UpdateProfileImage = () => {
    const token = localStorage.getItem('token');
    const { values, handleChange } = useForm({
        profileImage: null,
    });

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("profileImage", values.profileImage);

            console.log(data)

            const res = await API.put(
                `/member/update-profile-image?nocache=${Date.now()}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            if (res.data?.success === true) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.error);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(
                error.response?.data?.message ||
                "Something went wrong while updating profile image."
            );
        }
    };

    return (
        <div className="bg-white p-6 mt-8 rounded-md shadow-xl">
            <h1 className="text-lg font-bold mb-4">Update Profile Image</h1>
            <form onSubmit={handleImageSubmit}>
                <FileInput
                    label="Profile Image"
                    name="profileImage"
                    onChange={(e) => handleChange({
                        target: { name: "profileImage", value: e.target.files[0] }
                    })}
                    accept="image/*"
                    required
                />
                <DefaultButton type="submit" label="Update Image" className="w-full mt-4" />
            </form>
        </div>
    )
}

export default UpdateProfileImage
