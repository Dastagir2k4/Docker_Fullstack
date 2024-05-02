import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.value);
    return (
        <div className="container mx-auto p-6 bg-slate-300 ">
            <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
            <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2">Name:</label>
                    <p className="text-gray-700 text-lg">{user.FirstName} {user.SecondName}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-xl font-bold mb-2">Email:</label>
                    <p className="text-gray-700 text-lg">{user.Email}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
