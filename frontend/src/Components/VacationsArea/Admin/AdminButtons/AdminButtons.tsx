import { Grid, IconButton, Tooltip } from "@mui/material";
import "./AdminButtons.css";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useEffect, useState } from "react";
import VacationdModel from "../../../../Models/Vacation-model";
import { vacationsStore } from "../../../../Redux/VacationsState";
import vacationService from "../../../../Services/VacationService";
import { NavLink, useNavigate } from "react-router-dom";

interface AdminButtonsProps {
  deletVacation: () => void
  updateVaction:() =>void
}
function AdminButtons(props: AdminButtonsProps): JSX.Element {


  return (
    <div className="AdminButtons">
      <Grid container alignItems="center" justifyContent="space-between" className="card-actions">
        {/* <span>Delete</span> */}
        <Tooltip title="Delete Vacation">
        <IconButton className="delete" size="small" onClick={props.deletVacation}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="Update Vacation">
        <IconButton className="edit" size="small" onClick={props.updateVaction}>
         
          <UpdateIcon />
        </IconButton>
        </Tooltip>
      </Grid>
    </div>
  );
}

export default AdminButtons;
