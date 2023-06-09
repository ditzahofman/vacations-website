import { useEffect, useState } from "react";
import "./continentSelectionForm.css";
import continentModel from "../../../../Models/Continent-model";
import vacationService from "../../../../Services/VacationService";
import { MenuItem, TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";
import notifyService from "../../../../Services/NotifyService";

interface ContinentSelectionFormProps {
  onSubmit: UseFormRegisterReturn<"continentId">;
  defaultValue?: number;
}

function ContinentSelectionForm(props: ContinentSelectionFormProps): JSX.Element {
  const [continent, setContinent] = useState<continentModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllContinents()
      .then((c) => setContinent(c))
      .catch((err) => notifyService.error(err));
  }, []);

  function getValueFromSelect(event: React.ChangeEvent<{ value: unknown }>) {
    let selectedContinentId = +event.target.value;
    const syntheticEvent = { target: { value: selectedContinentId }, type: "change" };
    props.onSubmit.onChange(syntheticEvent);
   
  }

  return (
    <div className="continentSelectionForm">
      <TextField
        className="select"
        id="continent"
        label="Continent 🌏"
        select
        variant="outlined"
        margin="normal"
        onChange={getValueFromSelect}
        fullWidth
      
        defaultValue={props.defaultValue !== undefined ? props.defaultValue : ""}
        {...props.onSubmit}
      >
        <MenuItem value={0}>Select continent</MenuItem>
            {continent.map((c) => (
          <MenuItem className="option" key={c.continentId} value={c.continentId} defaultChecked >
            {c.continentName}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default ContinentSelectionForm;
