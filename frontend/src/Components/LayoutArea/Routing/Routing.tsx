import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Home from "../../HomeArea/Home/Home";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/vacations" element={<VacationCard/>}></Route>
            </Routes>
        </div>
    );
}

export default Routing;
