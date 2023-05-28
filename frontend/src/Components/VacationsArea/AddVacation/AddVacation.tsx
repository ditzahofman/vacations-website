import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationdModel from "../../../Models/Vacation-model";
import { Button, FormControl, Input, InputLabel, TextField } from "@mui/material";
import vacationService from "../../../Services/VacationService";

function AddVacation(): JSX.Element {
    const {register , handleSubmit} = useForm<VacationdModel>()

    async function send(vacation:VacationdModel):Promise<void>{
        try {
            await vacationService.addVacation(vacation)
        } catch (error) {
            alert(error)
        }
        

    }
    return (
        <div className="AddVacation">
			<form onSubmit={handleSubmit(send)}>
            <TextField
        label="Destination"
        required
        {...register("destination")}
      />
      <br />
      <TextField
        label="Description"
       {...register("description")}
        required
      />
      <br />
      <TextField
        type="date"
        label="Start Date"
        {...register("startDate")}
        required
      />
      <br />
      <TextField
        type="date"
        label="End Date"
        {...register("endDate")}
        required
      />
      <br />
      <TextField
        type="number"
        label="Price"
      {...register("price")}
        required
      />
      <br />
      <FormControl>
        <InputLabel htmlFor="image">Image</InputLabel>
        <Input
          type="file"
          id="image"
          inputProps={{ accept: 'image/*' }}
         {...register("image")}
          required
        />
      </FormControl>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
           
        </div>
    );
}

export default AddVacation;
