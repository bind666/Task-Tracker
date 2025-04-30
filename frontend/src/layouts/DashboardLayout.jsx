import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const DashboardLayout = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export default DashboardLayout;
