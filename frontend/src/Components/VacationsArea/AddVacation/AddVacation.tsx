import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationdModel from "../../../Models/Vacation-model";
import { Button, FormControl, TextField } from "@mui/material";
import vacationService from "../../../Services/VacationService";
import ContinentSelectionForm from "../continentSelectionForm/continentSelectionForm";
import useUser from "../../../Utils/UseUser";
import { useNavigate } from "react-router-dom";

function AddVacation(): JSX.Element {
  const user = useUser()
  const navigate = useNavigate()
if(!user) navigate("/login")
 
    const {register , handleSubmit } = useForm<VacationdModel>()

    async function send(vacation:VacationdModel):Promise<void>{
        try {
            const addedvacation=await vacationService.addVacation(vacation)
            console.log(addedvacation)
        } catch (error) {
            alert(error)
        }
        

    }
    return (
        <div className="AddVacation">
      
			<form onSubmit={handleSubmit(send)} >
      <h2>Add Vacation</h2>
      <ContinentSelectionForm onSubmit={register("continentId")}/>
            <TextField
        label="Destination"
        required
        {...register("destination")}
        focused
      />
      <br />
      <TextField
        label="Description"
       {...register("description")}
        required
        focused
      />
      <br />
      <TextField
        type="date"
        label="Start Date"
        {...register("startDate")}
        required
        focused
      />
      <br />
      <TextField
        type="date"
        label="End Date"
        {...register("endDate")}
        required
        focused
      />
      <br />
      <TextField
        type="number"
        label="Price"
      {...register("price")}
        required
        focused
      />
      <br />
      <FormControl>
       
        <TextField
        label="image"
          type="file"
          id="image"
          inputProps={{ accept: 'image/*' }}
         {...register("image")}
        focused
          required
        
        />
      </FormControl>
      <br />
      <Button className="button" type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
           
        </div>
    );
}

export default AddVacation;
