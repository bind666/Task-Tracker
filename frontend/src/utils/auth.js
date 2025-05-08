/* eslint-disable no-unused-vars */
import API from "../services/api";

export const isAuthenticated = async () => {
    try {
        const res = await API.get("/user/profile");
        if(res.status === 422){
            return null
        }
        return res.data?.data;
    } catch (error) {
        return null;
    }
};

export const logout = async () => {
    try {
        await API.delete("/user/logout");
    } catch (err) {
        console.error("Logout error", err);
    }
};


