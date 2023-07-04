import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

export default function useVerifyAdmin() {
    const navigate = useNavigate()

    useEffect(() => {
        const user= authStore.getState().user
               const userRole = authStore.getState().user?.role;

        if (!user) {
            notifyService.error("You are not logged in!");
            navigate("/login");
          
        }
else{
        if (userRole !== "Admin") {
            navigate("/");
            notifyService.error("Access denied!");
        }
        }
    }, []);
};