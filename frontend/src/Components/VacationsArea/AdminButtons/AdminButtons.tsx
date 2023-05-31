import { Grid, IconButton } from "@mui/material";
import "./AdminButtons.css";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';


function AdminButtons(): JSX.Element {
    
    return (
        <div className="AdminButtons">
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
        </div>
    );
}

export default AdminButtons;
