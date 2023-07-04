import { NavLink } from "react-router-dom";
import "./PageNotFound.css";
import { Undo } from "@mui/icons-material";
import NotFound from '../../../Assets/Images/page-not-found.gif';
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={NotFound} alt='not-found' />
            <div>
                <NavLink to="/home" className="Back">Back Home<Undo /></NavLink>
            </div>
        </div>
    );
}

export default PageNotFound;
