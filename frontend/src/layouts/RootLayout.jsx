import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

const RootLayout = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await isAuthenticated();
                if(data !== null){
                    return navigate("/dashboard") 
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
            } 
        }
        fetchData();
    }, []);
    return (<>
        < Navbar />
        <Outlet />
    </>)
};

export default RootLayout;
