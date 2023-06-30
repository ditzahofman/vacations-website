import { useEffect, useState } from "react";
import "./continentSelectionForm.css";
import continentModel from "../../../Models/Continent-model";
import vacationService from "../../../Services/VacationService";
import { MenuItem, TextField } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface ContinentSelectionFormProps {
  onSubmit: UseFormRegisterReturn<"continentId">;
  defaultValue?:number
}


function ContinentSelectionForm(props:ContinentSelectionFormProps): JSX.Element {

    const [continent , setcontinent] = useState<continentModel[]>([])
    
    
    useEffect(()=>{
vacationService.getAllContinents()
.then((c)=>setcontinent(c))
.catch((err)=>alert(err))
    },[])

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
          required
          fullWidth
          defaultValue={props.defaultValue}
          {...props.onSubmit}
        >
          {continent.map((c) => (
            <MenuItem className="option" key={c.continentId} value={c.continentId} defaultChecked>
              {c.continentName}  
            </MenuItem>
          ))}
        </TextField>
        </div>
    );
}

export default ContinentSelectionForm;