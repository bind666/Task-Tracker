import { useEffect, useState } from "react";
import API from "../services/api";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await API.get("/user/profile");
            setUser(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <div className="h-24 w-24 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-3xl font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {user?.name || "Loading..."}
                </h2>
                <p className="text-gray-500 mb-1">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {user?.email}
                </p>
                <p className="text-gray-500 mb-4">
                    <span className="font-medium text-gray-700">Country:</span>{" "}
                    {user?.country}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
