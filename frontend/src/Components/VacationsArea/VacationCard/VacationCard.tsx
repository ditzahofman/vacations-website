import "./VacationCard.css";
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VacationModel from "../../../Models/Vacation-model";
import UserModel from "../../../Models/User-model";
import AdminButtons from "../AdminButtons/AdminButtons";
import UserButtons from "../UserButtons/UserButtons";
import appConfig from "../../../Utils/AppConfig";
// import soundFile from "../../../Assets/Sound/button-124476.mp3"


interface VacationCardProps {
  vacation: VacationModel
  user: UserModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

  const [isExpanded, setIsExpanded] = useState(false);

  


  const toggleExpandDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (isExpanded || props.vacation.description.length <= 100) {
      return props.vacation.description;
    } else {
      return props.vacation.description.slice(0, 100) + '...';
    }
  };

  const handleClick = (vacationId:number) => {
    const audio = new Audio("../"); // Replace with the path to your sound file
    audio.play();
    //vacation to update
  };

  const isAdmin = props.user.role === 'Admin'

  return (

    <div className="VacationCard">
      <Box boxShadow={7}>
      <Card className="card">
        <div className="card-image-container">
          <CardMedia
            className="card-image"
            component="img"
            height="140"
            src={appConfig.vacationImagesUrl + props.vacation.imageName}
            alt="Card Image"
          />

          <div className="location-icon">
            <LocationOnIcon />{props.vacation.destination}
          </div>

        </div>

        <CardContent className="card-content">

          {isAdmin ? (
            <AdminButtons />
          ) : (
            <UserButtons vacation={props.vacation} user={props.user} />
          )}

          <Typography variant="body2" color="text.secondary" className="card-description">
            {renderDescription()}
          </Typography >
          {props.vacation.description.length > 100 && (
            <Typography
              variant="body2"
              color="text.secondary"
              onClick={toggleExpandDescription}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" className="card-dates">
            <EventIcon /> Dates: {new Date(props.vacation.startDate).toLocaleDateString()} - {new Date(props.vacation.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="price">
          <AttachMoneyIcon />Price: {props.vacation.price}
          </Typography>
          <Button onClick={()=>{
            handleClick(props.vacation.vacationId)
          }}>More Details</Button>
        </CardContent>
      
      </Card>
      </Box>
    </div>
  );
}

export default VacationCard;
