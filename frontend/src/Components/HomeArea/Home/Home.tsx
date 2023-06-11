
import "./Home.css";

import { NavLink, useNavigate } from "react-router-dom";
import GetVacationsForm from "../../VacationsArea/getVacationsForm/getVacationsForm";
import useUser from "../../../Utils/UseUser";
import VacationList from "../../VacationsArea/VacationList/VacationList";

function Home(): JSX.Element {
   const user = useUser()

    return (
        <div className="homeComponent">
  {!user && (
    <><div  className="Home">
            <div className="text">
        <b><h1>your journey your story</h1></b>
        <p className="para">Choose Your Favorite Destination</p>
        <NavLink to="/login"><button className="get-started-button">Let's start, Login!</button></NavLink>
      </div>
      </div>
    </>
  )}
  {user&&
  <VacationList/>}
</div>

    );
}

export default Home;
