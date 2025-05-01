import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = () => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        isAuthenticated().then(setAuth);
    }, []);

    if (auth === null) return <div>Loading...</div>;

    return auth ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
