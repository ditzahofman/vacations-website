import "./VacationCard.css";
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VacationModel from "../../../Models/Vacation-model";
import UserModel from "../../../Models/User-model";
import AdminButtons from "../Admin/AdminButtons/AdminButtons";
import UserButtons from "../User/UserButtons/UserButtons";
import appConfig from "../../../Utils/AppConfig";
import vacationService from "../../../Services/VacationService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";



interface VacationCardProps {
  vacation: VacationModel
  user: UserModel

}

function VacationCard(props: VacationCardProps): JSX.Element {

  const [isExpanded, setIsExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
  async function deleteMe() {
    try {
      // // Validate if the admin is sure:
      // if (!window.confirm("Are you sure?")) return;
      setOpenDialog(true);
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  async function confirmDelete() {
    try {
      setOpenDialog(false);
      await vacationService.deleteVacation(props.vacation.vacationId);
      notifyService.success("Vacation has been deleted");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  function cancelDelete() {
    setOpenDialog(false);
  }

  const navigate = useNavigate()

  const isAdmin = props.user.role === 'Admin'

  return (

    <div className="VacationCard">
      <Box boxShadow={7}>
        <Card className="card">
          <div className="card-image-container">

            {isAdmin ? (
              <div className="buttonsCard">
                <AdminButtons
                  deletVacation={deleteMe}
                  updateVaction={() => {
                    navigate(`/update/${props.vacation.vacationId}`);
                  }}
                />
              </div>
            ) : (<div className="buttonsCard">
              <UserButtons vacation={props.vacation} user={props.user} />
            </div>
            )}

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
            <Typography variant="body2" color="text.secondary" className="price">
              <b>  {props.vacation.price}$ </b>
            </Typography>
          </div>

          <CardContent className="card-content">
            <Typography variant="body2" color="text.secondary" className="card-dates">
              <EventIcon />  {new Date(props.vacation.startDate).toLocaleDateString()}⇝{new Date(props.vacation.endDate).toLocaleDateString()}
            </Typography>
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
            <Dialog open={openDialog} onClose={cancelDelete}>
              <DialogTitle>Delete Vacation</DialogTitle>
              <DialogContent>
                <Typography variant="body2">Are you sure you want to delete this vacation?</Typography>
              </DialogContent>
              <DialogActions>
                <Button className="button" onClick={cancelDelete}>Cancel</Button>
                <Button className="button" onClick={confirmDelete} autoFocus>Delete</Button>
              </DialogActions>
            </Dialog>
            {/* <Button className="detailsButton" onClick={()=>{
        
          }}>More Details</Button> */}
          </CardContent>

        </Card>
      </Box>
    </div>
  );
}

export default VacationCard;
