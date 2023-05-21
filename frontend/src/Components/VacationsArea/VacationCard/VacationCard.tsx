import "./VacationCard.css";
import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, FormControlLabel, Grid, IconButton, Switch, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VacationdModel from "../../../Models/Vacation-model";
import appConfig from "../../../Utils/AppConfig";
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import vacationService from "../../../Services/VacationService";

interface VacationCardProps {
  vacation: VacationdModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

  const [isFollowed, setIsFollowed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
async function handleToggleFollow() {
 
    setIsFollowed(!isFollowed);
  };

  const toggleExpandDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = () => {
    if (isExpanded || props.vacation.description.length <= 100) {
      return  props.vacation.description;
    } else {
      return  props.vacation.description.slice(0, 100) + '...';
    }
  };

  return (
    <div className="VacationCard">
      <Card>
        <CardMedia
        className="card-image"
          component="img"
          height="140"
          src={appConfig.vacationImagesUrl + props.vacation.imageName}
          alt="Card Image"
        />
        {/* <img src={appConfig.vacationImagesUrl+props.vacation.imageName}/> */}
        <CardContent className="card-content">
          <Grid container alignItems="center" justifyContent="space-between" className="card-actions">
            <FormControlLabel
              control={
                <Switch
                  checked={isFollowed}
                  onChange={handleToggleFollow}
                  name="toggleFollow"
                  color="primary"
                />
              }
              label={isFollowed ? 'Following' : 'Follow'}
            />
            <Grid item>
              <IconButton size="small">
                <FavoriteIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {props.vacation.followerCount}
              </Typography>
            </Grid>
          </Grid>
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
          <Typography variant="body2" color="text.secondary" className="card-destination">
            <LocationOnIcon /> Location: {props.vacation.destination}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="card-dates">
            <EventIcon /> Dates: {new Date(props.vacation.startDate).toLocaleDateString()} - {new Date(props.vacation.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <AttachMoneyIcon /> Price: {props.vacation.price}$
          </Typography>

        </CardContent>
      </Card>
    </div>
  );
}

export default VacationCard;
