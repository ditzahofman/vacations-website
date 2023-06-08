import { Button, TextField } from "@mui/material";
import "./getVacationsForm.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationService";
import { useForm } from "react-hook-form";
import { authStore } from "../../../Redux/AuthState";
import ContinentSelectionForm from "../continentSelectionForm/continentSelectionForm";
import VacationCard from "../VacationCard/VacationCard";

function GetVacationsForm(): JSX.Element {
  const user = authStore.getState().user;
  const { register, handleSubmit } = useForm<VacationModel>();
  const[vacation , setVaction] = useState<VacationModel[]>()
  let d = false
  async function sendAndGet(vacation: VacationModel) {
    try {
     
      const vacationPackage = await vacationService.getVacationPackege(
        user.userId,
        vacation.continentId,
        vacation.startDate,
        vacation.price
      );
      setVaction(vacationPackage)
      d = true
     
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="getVacationsForm">
       {/* <h2>Choose your dream vacation</h2> */}

      <form onSubmit={handleSubmit(sendAndGet)}  >
              <ContinentSelectionForm onSubmit={register("continentId")}  />
          <TextField
        className="textField"
        required
          id="date"
          label="Date"
          type="date"
          variant="outlined"
          margin="normal"
            InputLabelProps={{
            shrink: true,
          }}
          {...register("startDate")}
        />
        <TextField
         className="textField"
         required
          id="price"
          label="Price"
          type="number"
          variant="outlined"
          margin="normal"
          {...register("price")}
        />
        <Button type="submit" variant="contained" color="primary" className="button">
          Search
        </Button>
      </form>

      {
       vacation&&
        <>
       {vacation.map(v=><VacationCard key={v.vacationId} vacation={v}  user={user}/>)}
        </>
      }
      {
!vacation&& 
<><p>No results have been found</p></>
      }
    </div>
  );
}

export default GetVacationsForm;


     

