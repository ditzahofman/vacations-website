import "./Home.css";

import { NavLink, useNavigate } from "react-router-dom";
import VacationList from "../../VacationsArea/SharedArea/VacationList/VacationList";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/User-model";

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>()

  // Subscribe to the authStore to get the current user
  useEffect(() => {
    setUser(authStore.getState().user)

    // Update the user state whenever the authStore changes
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => unsubscribe();
  }, [setUser])
  
  return (
    <div className="homeComponent">
      {user && (
        // Render the VacationList component if the user is authenticated
        <VacationList />
      )}
      {!user && (
        // Render the welcome message and login prompt if the user is not authenticated
        <>
          <div className="Home">
            <div className="text">
              <b><h1>your journey your story</h1></b>
              <p className="para">Choose Your Favorite Destination</p>
              <NavLink to="/login"><button className="get-started-button">Let's start, Login!</button></NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
