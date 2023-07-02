import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import LogOut from "../../AuthArea/LogOut/LogOut";
import VacationList from "../../VacationsArea/SharedArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/Admin/AddVacation/AddVacation";
import Chart from "../../VacationsArea/Admin/Chart/Chart";
import EditVacation from "../../VacationsArea/Admin/EditVacation/EditVacation";
import CsvFile from "../../VacationsArea/Admin/CsvFile/CsvFile";
import VacationDetails from "../../VacationsArea/SharedArea/VacationDetails/VacationDetails";
import About from "../../AboutArea/About/About";





function Routing(): JSX.Element {
    return (
        <div className="Routing">
           
            <Routes>
           
                <Route path="/home" element={<Home />}></Route>
                <Route path="/update/:vacationId" element={<EditVacation/>}></Route>
                <Route path="/add-vacation" element={<AddVacation/>}></Route>
                <Route path="/details/:vacationId" element={<VacationDetails/>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<LogOut />}></Route>
                <Route path="/chart" element={<Chart />}></Route>
                <Route path="/csv" element={ <CsvFile />}></Route>
                <Route path="/about" element={ <About/>}></Route>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    );
}

export default Routing;
