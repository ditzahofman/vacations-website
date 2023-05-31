
import "./Home.css";
import plann from "../../../Assets/Images/aeroplane-2026921_1280.webp"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthState, authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/User-model";
import aeroplane from "../../../Assets/Images/aeroplane-2026921_1280.webp"
import world from "../../../Assets/Images/globus-2534766_1920.png"
import map from "../../../Assets/Images/netherlands-303419_1280.png"
function Home(): JSX.Element {
    const [user, setUser] = useState<UserModel>()
const navigate = useNavigate()
    useEffect(() => {
        setUser(authStore.getState().user)
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        
        });
        
        return () => unsubscribe();
    }, [])

    
    return (
        <div className="Home">
            {!user && <>
            <img className="aeroplane" src={aeroplane}/>
                 <div className="welcome-container">
                <h1 className="welcome-title">Welcome !</h1>
                <p className="site-description">Explore popular destinations, plan your dream getaway, and stay updated on special offers and travel tips. Sign up for free to access additional features and start your journey to unforgettable vacations.</p>
                <p className="closing-message">Happy travels,<br />The Vacation Site Team</p>
                <button className="get-started-button"><NavLink to={"/login"}>Get Started</NavLink></button>
               
            </div>
            
           <img className="globus" src={world} width="30%"/>
           <img className="map" src={map}/>
           
           </>
          
           
        }
        {user&&
            <>
            {navigate("/vacations")}
            </>
        }
        </div>
    );
}

export default Home;
