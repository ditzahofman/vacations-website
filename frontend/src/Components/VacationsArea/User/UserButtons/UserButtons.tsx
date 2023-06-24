import "./UserButtons.css";
import { FormControlLabel, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserModel from "../../../../Models/User-model";
import vacationService from "../../../../Services/VacationService";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupIcon from "@mui/icons-material/Person";
import VacationdModel from "../../../../Models/Vacation-model";

interface UserButtonsProps {
  vacation: VacationdModel;
  user: UserModel;
}

function UserButtons(props: UserButtonsProps): JSX.Element {
  const [isFollowing, setIsFollowing] = useState<boolean>(props.vacation.isFollowing);

  useEffect(() => {
    setIsFollowing(props.vacation.isFollowing);
  }, [props.vacation.isFollowing]);

  async function handleToggleFollow(): Promise<void> {
    try {
      if (props.user && props.user.userId) {
        const vacationId = props.vacation.vacationId;
        const userId = props.user.userId;

        if (isFollowing) {
          // If already followed, send a delete request to remove the follower
          await vacationService.unFollower(userId, vacationId);
        } else {
          // If not followed, send a post request to add the follower
          await vacationService.addFollower(userId, vacationId);
        }

        // Toggle the state after successful API call
        setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      }
    } catch (error) {
      console.log("Error toggling follow:", error);
    }
  }

  return (
    <div className="UserButtons">
      <Grid container alignItems="center" justifyContent="space-between" className="card-actions">
        <FormControlLabel
          control={
            <IconButton onClick={handleToggleFollow} className={`like ${isFollowing ? "active" : ""}`}>
              {isFollowing ? <FavoriteIcon style={{ color: "orange" }} /> : <FavoriteBorderIcon />}
            </IconButton>
          }
          label={isFollowing ? "👍🏻" : "👎🏻"}
        />
        <Typography className="folowers">
          <GroupIcon />+{props.vacation.followerCount}
        </Typography>
      </Grid>
    </div>
  );
}

export default UserButtons;

  
