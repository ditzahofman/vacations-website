
import "./Home.css";

import { NavLink, useNavigate } from "react-router-dom";
import GetVacationsForm from "../../VacationsArea/User/getVacationsForm/getVacationsForm";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import { authStore } from "../../../Redux/AuthState";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/User-model";

function Home(): JSX.Element {
  const [user, setUser] = useState<UserModel>()

  useEffect(() => {
    setUser(authStore.getState().user)
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => unsubscribe();
  }, [setUser])
  return (
    <div className="homeComponent">
      {user &&
        <VacationList />}
      {!user && (
        <><div className="Home">
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
