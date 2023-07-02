import { useNavigate } from "react-router-dom";
import "./LogOut.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function LogOut(): JSX.Element {
    const navigate = useNavigate()

    useEffect(() => {
        authService.logout()
       notifyService.success("Goodbye")
        navigate("/home")
    }, [])

    return
}

export default LogOut;
