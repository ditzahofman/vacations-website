import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/User-model";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import "./AuthMenu.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(authStore.getState().user)
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        
        return () => unsubscribe();
    }, [])
    return (
        <div className="AuthMenu">
            {!user &&
                <>
                    <span>Hello guest </span>
                    &nbsp;
                    <NavLink to={"/register"}> <AppRegistrationIcon/>Register |</NavLink>
                    &nbsp;
                    <NavLink to={"/login"}> <LoginIcon/>Login  </NavLink>
                   
                </>
            }
            {user&& <>
                <span>Hello {user.firstName+" "+user.lastName}  |</span>
                &nbsp;
                <NavLink to={"/logout"}><LogoutIcon/>Logout |</NavLink>
            </>
            }
        </div>
    );
}

export default AuthMenu;
