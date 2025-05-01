import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";

import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import Profile from "../pages/Profile";
import Auth from "../pages/Auth";
// import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    // {
                    //     path: "",
                    //     element: <Navigate to="/dashboard" replace />,
                    // },
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "projects", element: <Projects /> },
                    { path: "tasks/:projectId", element: <Tasks /> },
                    { path: "profile", element: <Profile /> },
                ],
            },
            {
                path: "auth",
                element: <Auth />,
            },
        ],
    },
    // {
    //   path: "*",
    //   element: <NotFound />,
    // },
]);

export default router;
