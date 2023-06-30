import { useEffect, useState } from "react";
import "./VacationDetails.css";
import { useParams } from "react-router-dom";
import vacationService from "../../../Services/VacationService";
import VacationdModel from "../../../Models/Vacation-model";
import appConfig from "../../../Utils/AppConfig";
import { NavLink } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { Typography } from "@mui/material";
function VacationDetails(): JSX.Element {
const params = useParams()
const[vacation , setVacation]= useState<VacationdModel>()
const [isExpanded, setIsExpanded] = useState(false);
useEffect(() => {
        const vacationId = + params.vacationId; 
        vacationService.getOneVacation(vacationId)
            .then((vacation) => {setVacation(vacation)
            console.log(vacation)
            })
            .catch(err => alert(err));
    }, [])
    const toggleExpandDescription = () => {
        setIsExpanded(!isExpanded);
      };
    
    
      const renderDescription = () => {
        if (isExpanded || vacation.description.length <= 100) {
          return vacation.description;
        } else {
          return vacation.description.slice(0, 800) + '...';
        }
      };
    return (
        <div className="centered-container">
            {vacation&&
        <div className="VacationDetails">
          <img src={appConfig.vacationImagesUrl+vacation.imageName} alt="Vacation" />
          <h2>{vacation.destination}</h2>
          <Typography
              variant="body2"
              color="text.secondary"
              className={`card-description ${isExpanded ? 'expanded' : ''}`}
            >
              {renderDescription()}
            </Typography>
            {vacation.description.length > 600 && (
              <Typography
                variant="body2"
                color="text.secondary"
                onClick={toggleExpandDescription}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
              </Typography>
            )}
                   <p className="stars"> 
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon /></p>
          <NavLink to={"/home"} className="back">🔙</NavLink>
        </div>}
      </div>
    );
}

export default VacationDetails;
