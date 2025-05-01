import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start in loading state
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await isAuthenticated();
                setUser(data);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [location.pathname]); // Removed `user` from dependency array

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="w-10 h-10 animate-spin border-b-0 border">
                    {/* loading */}
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default DashboardLayout;
