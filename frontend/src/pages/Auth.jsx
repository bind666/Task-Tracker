import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        country: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsLogin((prev) => !prev);
        setError("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                await API.post("/user/login", {
                    email: form.email,
                    password: form.password,
                });

                navigate("/dashboard");
            } else {
                await API.post("/user/register", form);
                alert("Signup successful! Please login.");
                setIsLogin(true);
                setForm({ name: "", email: "", password: "", country: "" });
            }
        } catch (err) {
            const msg = err?.response?.data?.message || "Something went wrong";
            setError(msg);
        }
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await isAuthenticated();
    //             if(data === null){
    //                 return navigate("/")
    //             }
    //         } catch (error) {
    //             console.error("Authentication check failed:", error);
    //         } 
    //     }
    //     fetchData();
    // }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Signup"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={handleToggle}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
