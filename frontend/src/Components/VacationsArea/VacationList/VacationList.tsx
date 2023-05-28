import { useEffect, useState } from "react";
import "./VacationList.css";
import VacationdModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import UserModel from "../../../Models/User-model";
import { authStore } from "../../..//Redux/AuthState";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RoleModel from "../../../Models/Role-model";
import { useNavigate } from "react-router-dom";

function VacationList(): JSX.Element {
    const[user , setUser] = useState<UserModel>()
    const [vacations , setVacations] = useState<VacationdModel[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        setUser(authStore.getState().user)
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
           

            
        });
        
        return () => unsubscribe();
    }, [])
  
    useEffect(() => {
        if (user && user.userId) {
          vacationService
            .getAllVacations(user.userId)
            .then((v) => setVacations(v))
            .catch((e) => alert(e));
        }
      }, [user]);
 

    return (
        <div className="VacationList">
            {user?.role === RoleModel.Admin && (
  <IconButton color="primary" onClick={()=>{
    navigate("/add-vacation")
  }}>
    add vacation
    <AddIcon />
  </IconButton>
)}
			{vacations.map(v=><VacationCard key={v.vacationId} vacation={v} userRole={user.role}/>)}

        </div>
    );
}

export default VacationList;
