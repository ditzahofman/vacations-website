import { useNavigate } from "react-router-dom";
import "./LogOut.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";

function LogOut(): JSX.Element {
    const navigate = useNavigate()

    useEffect(() => {
        authService.logout()
        alert("bye bye")
        navigate("/Login")
    }, [])

    return (null);
}

export default LogOut;
