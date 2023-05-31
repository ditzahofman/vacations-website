import "./UserButtons.css";
import { FormControlLabel, Grid, IconButton, Switch, Typography } from "@mui/material";
import VacationdModel from "../../../Models/Vacation-model";
import { useState } from "react";
import UserModel from "../../../Models/User-model";
import vacationService from "../../../Services/VacationService";
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import GroupIcon from "@material-ui/icons/Person"

interface UserButtonsProps {
	vacation: VacationdModel
    user: UserModel 
}

function UserButtons(props: UserButtonsProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing);

    async function handleToggleFollow(): Promise<void> {
        try {
            if (props.user && props.user.userId) {
                if (props.vacation.isFollowing) {
                    // If already followed, send a delete request to remove the follower
                    await vacationService.unFollower(props.user.userId, props.vacation.vacationId);


                } else {
                    // If not followed, send a post request to add the follower
                    await vacationService.addFollower(props.user.userId, props.vacation.vacationId);

                }
                // Toggle the state after successful API call
                setIsFollowing((prevIsFollowing) => !prevIsFollowing);
            }
        } catch (error) {
            console.log('Error toggling follow:', error);
        }
    }

   
    return (
        <div className="UserButtons">
			<Grid container alignItems="center" justifyContent="space-between" className="card-actions">
              <FormControlLabel
                control={
                    <IconButton onClick={handleToggleFollow}>
                    {isFollowing ? <FavoriteIcon style={{ color: 'teal' }} /> : <FavoriteBorderIcon />}
                  </IconButton>
               
                }
                label={props.vacation.isFollowing ? "Following" : "Not Following"}
              />
             
              <Grid item>
                                <GroupIcon />  {/* or <GroupIcon /> */}
                      <Typography variant="body2" color="textSecondary">
                  {props.vacation.followerCount}
                </Typography>
              </Grid>
            </Grid>
        </div>
    );
}

export default UserButtons;
