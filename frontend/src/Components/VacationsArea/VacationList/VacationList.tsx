import { useEffect, useState } from "react";
import "./VacationList.css";
import VacationdModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RoleModel from "../../../Models/Role-model";
import { useNavigate } from "react-router-dom";
import useUser from "../../../Utils/UseUser";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";


function VacationList(): JSX.Element {
  
  const user = useUser()
  
  const [vacations, setVacations] = useState<VacationdModel[]>([])
 
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user && user.userId) {
      vacationService
        .getAllVacations()
        .then((v) => setVacations(v))
        .catch((e) => alert(e));
    }
  }, [user,vacations]);
 

 
  useVerifyLoggedIn();

  async function deleteClickedVacation(vacationId: number) {
    try {
        await vacationService.deleteVacation(vacationId);
          }
    catch (err: any) {
       alert(err.message)
    }
}
  return (
    <div className="VacationList">
      {user?.role === RoleModel.Admin && (
        <IconButton className="add" onClick={() => {
          navigate("/add-vacation")
        }}>
          {/* add vacation */}
          <AddIcon />
        </IconButton>
        
      )}
      {<br/>&&
      vacations?.map(v => <VacationCard key={v.vacationId} vacation={v} user={user}  />)}
    </div>
  );
}

export default VacationList;
