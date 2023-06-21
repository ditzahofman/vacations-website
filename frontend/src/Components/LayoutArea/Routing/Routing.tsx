import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import LogOut from "../../AuthArea/LogOut/LogOut";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import Chart from "../../VacationsArea/Chart/Chart";




function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                
                <Route path="/home" element={<Home />}></Route>
                <Route path="/vacations" element={<VacationList/>}></Route>
                <Route path="/add-vacation" element={<AddVacation/>}></Route>
                <Route path="/chart" element={<Chart/>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<LogOut />}></Route>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    );
}

export default Routing;
