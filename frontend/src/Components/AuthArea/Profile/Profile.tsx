import { Avatar, Button, TextField, Typography } from "@mui/material";
import "./Profile.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserModel from "../../../Models/User-model";
import { authStore } from "../../../Redux/AuthState";

function Profile(): JSX.Element {

const userId = authStore .getState().user.userId

useEffect(()=>{

},[])
  const handleSubmit = () => {
 
  };
    return (
        <div className="Profile">
		<div className="profile">
      <Avatar className='avatar' alt="Profile Picture" src="/path-to-profile-picture.jpg" />
      <Typography variant="h6">User Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
         className='textField'
          label="Full Name"
          variant="outlined"
          fullWidth
        
        />
        <TextField
         className='textField'
          label="Email"
          variant="outlined"
          fullWidth
      
        />
        <TextField
          className='textField'
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        
        />
        <Button className="button" variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
        </div>
    );
}

export default Profile;
