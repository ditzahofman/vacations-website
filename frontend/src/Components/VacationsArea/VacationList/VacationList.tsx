import { useEffect, useState } from "react";
import "./VacationList.css";
import VacationdModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";

function VacationList(): JSX.Element {
    const [vacations , setVacations] = useState<VacationdModel[]>([])
    
    useEffect(()=>{
vacationService.getAllVacations()
.then(v=>setVacations(v))
.catch(e=>alert(e))
    },[])
    return (
        <div className="VacationList">
			{vacations.map(v=><VacationCard key={v.vacationId} vacation={v}/>)}
        </div>
    );
}

export default VacationList;
