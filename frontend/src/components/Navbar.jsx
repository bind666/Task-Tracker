import { Link, useNavigate } from "react-router-dom";
import { logout, isAuthenticated } from "../utils/auth";

const Navbar = () => {
    const navigate = useNavigate();
    // const [loggedIn, setLoggedIn] = useState(false);
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         const authStatus = await isAuthenticated();
    //         setLoggedIn(authStatus);
    //     };
    //     checkAuth();
    // }, []);

    const handleLogout = () => {
        logout();
        // setLoggedIn(false); // update state immediately
        navigate("/auth");
    };

    return (
        <nav className="bg-gray-800 text-white px-7 py-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="space-x-8 text-[20px]">
                    <Link to="/dashboard" className="hover:text-blue-400 font-bold ">
                        Dashboard
                    </Link>
                    <Link to="/projects" className="hover:text-blue-400 font-bold">
                        Projects
                    </Link>
                    <Link to="/profile" className="hover:text-blue-400 font-bold">
                        Profile
                    </Link>
                </div>

                {isAuthenticated() && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
