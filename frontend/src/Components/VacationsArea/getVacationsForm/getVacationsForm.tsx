import { Button, TextField } from "@mui/material";
import "./getVacationsForm.css";
import VacationModel from "../../../Models/Vacation-model";
import { useForm } from "react-hook-form";
import { authStore } from "../../../Redux/AuthState";
import ContinentSelectionForm from "../continentSelectionForm/continentSelectionForm";
import filterVacationsService from "../../../Services/FilterVactionsService";

interface GetVacationProps {
  onFilter: (filteredVacations: VacationModel[] | undefined) => void;
}

function GetVacationsForm(props: GetVacationProps): JSX.Element {
  const user = authStore.getState().user;

  const { register, handleSubmit } = useForm<VacationModel>();

 async function sendAndGet (vacation: VacationModel)  {
    try {
      const vacationsPackage = filterVacationsService.filterByFormUser(

        vacation.continentId,
        vacation.startDate,
        vacation.price
      );

      props.onFilter(vacationsPackage);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="getVacationsForm">
      <h2>Choose your dream vacation</h2>
      <form onSubmit={handleSubmit(sendAndGet)}>
        <ContinentSelectionForm onSubmit={register("continentId")} />
        <TextField
          className="textField"
          required
          id="date"
          label="Date 📅"
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
          label="Price 💳"
          type="number"
          variant="outlined"
          margin="normal"
          {...register("price")}
        />
        <Button type="submit" variant="contained" color="primary" className="button">
          Search
        </Button>
      </form>
    </div>
  );
}

export default GetVacationsForm;



     

