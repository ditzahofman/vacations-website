import { Button, TextField } from "@mui/material";
import "./SearchForm.css";
import VacationModel from "../../../../Models/Vacation-model";
import { useForm } from "react-hook-form";
import { authStore } from "../../../../Redux/AuthState";
import ContinentSelectionForm from "../../SharedArea/continentSelectionForm/continentSelectionForm";
import filterVacationsService from "../../../../Services/FilterVactionsService";
import { useState } from "react";
import VacationCard from "../../SharedArea/VacationCard/VacationCard";
import notifyService from "../../../../Services/NotifyService";


function SearchForm(): JSX.Element {

  const user = authStore.getState().user;

  const [searched, setSearched] = useState(false);
  let [vacationsPackage, setvacationsPackage] = useState<VacationModel[]>([])

  const { register, handleSubmit, reset } = useForm<VacationModel>();

  async function sendAndGet(vacation: VacationModel) {
    try {
      if (searched) {
        reset();
        setvacationsPackage([]);
        setSearched(false);
      } else {
        vacationsPackage = filterVacationsService.filterByFormUser(
          vacation.continentId,
          vacation.startDate,
          vacation.price
        );
        reset();
        setvacationsPackage(vacationsPackage);
        setSearched(true);
      }
    } catch (error) {
      notifyService.error(error);
    }
  }

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
        <Button
          type="submit"
          variant="contained"
          className="button"
          onClick={handleSubmit(sendAndGet)}
        >
          {searched ? "Clear Search" : "Search"}
        </Button>

      </form>
      <div className="filterVacations">
        {vacationsPackage.length > 0 ? (
          vacationsPackage.map((vacation) => (
            <VacationCard key={vacation.vacationId} vacation={vacation} user={user} />
          ))
        ) : (
          searched===true&&
          <p className="noFound">Sorry, no results have been found</p>
        )}
      </div>
    </div>
  );
}

export default SearchForm;





