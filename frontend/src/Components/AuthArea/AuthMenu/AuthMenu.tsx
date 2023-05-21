import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/User-model";
import { AuthState, authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";
import { useEffect, useState } from "react";
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
                    <span>Hello guest  |</span>
                    <NavLink to={"/register"}>Register |</NavLink>
                    <NavLink to={"/login"}>Login  </NavLink>
                   
                </>
            }
            {user&& <>
                <span>Hello {user.firstName+user.lastName}  |</span>
                <NavLink to={"/logout"}>Logout |</NavLink>
            </>
            }
        </div>
    );
}

export default AuthMenu;
