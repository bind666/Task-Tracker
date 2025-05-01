import API from "../services/api";
// Api call token -->  cookie 

export const isAuthenticated = async () => {
    try {
        const res = await API.get("/user/profile");
        return !!res.data?.data;
    } catch {
        return false;
    }
};
export const getToken = () => localStorage.getItem("token");
// export const logout = () => localStorage.removeItem("token");
export const logout = async () => {
    try {
        await API.delete("/user/logout");
    } catch (err) {
        console.error("Logout error", err);
    }
};


