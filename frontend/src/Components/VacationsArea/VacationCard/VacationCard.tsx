import "./VacationCard.css";
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardMedia, FormControlLabel, Grid, IconButton, Switch, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VacationModel from "../../../Models/Vacation-model";
import appConfig from "../../../Utils/AppConfig";
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import vacationService from "../../../Services/VacationService";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/User-model";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


interface VacationCardProps {
  vacation: VacationModel
  userRole: string;
}

function VacationCard(props: VacationCardProps): JSX.Element {

  const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing === 1);
  const [user, setUser] = useState<UserModel | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);
 
  useEffect(() => {
    setUser(authStore.getState().user);

    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user);
    });

    return () => unsubscribe();
  }, []);

  async function handleToggleFollow(): Promise<void> {
    try {
      if (user && user.userId) {
        if (props.vacation.isFollowing === 1) {
          // If already followed, send a delete request to remove the follower
          await vacationService.unFollower(user.userId,props.vacation.vacationId);
        
        
        } else {
          // If not followed, send a post request to add the follower
          await vacationService.addFollower(user.userId, props.vacation.vacationId);
       
        }

        // Toggle the state after successful API call
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);
        
      }
    } catch (error) {
      console.log('Error toggling follow:', error);
    }
  }

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
  const isAdmin = props.userRole === 'Admin'
  return (
  
    <div className="VacationCard">
      <Card>
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
  <Grid container alignItems="center" justifyContent="space-between" className="card-actions">
    <IconButton size="small" color="primary">
      Delete
      <DeleteIcon />
    </IconButton>
    <IconButton size="small" color="primary">
      Update
      <UpdateIcon />
    </IconButton>
  </Grid>
) : (
  <Grid container alignItems="center" justifyContent="space-between" className="card-actions">
    <FormControlLabel
      control={
        <Switch
          checked={isFollowing}
          onChange={handleToggleFollow}
          name="toggleFollow"
          color="primary"
        />
      }
      label={props.vacation.isFollowing === 1 ? "Following" : "Not Following"}
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
          {/* <Typography variant="body2" color="text.secondary" className="card-destination">
            <LocationOnIcon /> Location: {props.vacation.destination}
          </Typography> */}
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
