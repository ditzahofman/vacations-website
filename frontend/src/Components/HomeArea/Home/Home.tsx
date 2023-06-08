
import "./Home.css";

import { NavLink, useNavigate } from "react-router-dom";
import GetVacationsForm from "../../VacationsArea/getVacationsForm/getVacationsForm";
import useUser from "../../../Utils/UseUser";

function Home(): JSX.Element {
   const user = useUser()

    return (
        <div className="Home">
  {!user && (
    <>
            <div className="text">
        <b><h1>your journey your story</h1></b>
        <p className="para">Choose Your Favorite Destination</p>
        <NavLink to="/login"><button className="get-started-button">Let's start, Login!</button></NavLink>
      </div>
    </>
  )}
  {user&&user.role==="User" ?(
    <>
    <p className="p">Search vacation packages & trips</p>
      <GetVacationsForm/>
    </>
  ):(
    user&&user.role==="Admin"&&
  <>
  <p className="p">Wellcome Admin</p>
 <NavLink className="p" to={"/vacations"}>Go to vacations ⇝</NavLink>
  </>)}
</div>

    );
}

export default Home;
