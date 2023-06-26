import { RegisterOptions, UseFormRegisterReturn, useForm } from "react-hook-form";
import "./EditVacation.css";
import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../../Redux/AuthState";
import vacationService from "../../../../Services/VacationService";
import utils from "../../../../Utils/utils";
import VacationdModel from "../../../../Models/Vacation-model";
import ContinentSelectionForm from "../../continentSelectionForm/continentSelectionForm";
import notifyService from "../../../../Services/NotifyService";



function EditVacation(): JSX.Element {

  const user = authStore.getState().user.role;
  const navigate = useNavigate();
  const params = useParams()


  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<VacationdModel>();

  useEffect(() => {
    const id = +params.vacationId;
    vacationService.getOneVacation(id)
      .then(v => {
        setValue("vacationId", v.vacationId);
        setValue("continentId", v.continentId);
        setValue("destination", v.destination);
        setValue("description", v.description);
        setValue("startDate", utils.formatDate(v.startDate));
        setValue("endDate", utils.formatDate(v.endDate));
        setValue("price", v.price);     
      })
      .catch(err => alert(err.message));
  }, []);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function send(vacation: VacationdModel): Promise<void> {
    try {
      console.log(vacation);
      if (vacation.endDate <= vacation.startDate) {
        setError("endDate", { message: "End date must be later than the start date" });
        return;
      }
     
     await vacationService.editVacation(vacation)
    
      notifyService.success("The vacation was successfully edit");
      navigate("/home");
    } catch (error) {
    notifyService.error(error);
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }


  return (
    <div className="EditVacation">
      <div>
        
      <form onSubmit={handleSubmit(send)}>

          <h2>Edit Vacation</h2>

          <input type="hidden" {...register("vacationId")} />
          <ContinentSelectionForm onSubmit={register('continentId')}/>

         
          <TextField label="Destination" className="textField"
            {...register("destination", VacationdModel.destinationValidation)}
            helperText={errors.destination?.message}
            focused
          />

          <TextField label="Description" className="textField"
            {...register("description", VacationdModel.descriptionValidation)}
            helperText={errors.description?.message}
            focused
          />

          <TextField type="date" label="Start Date" className="textField"
            {...register("startDate", VacationdModel.startDateValidation)}
            focused />

          <TextField type="date" label="End Date" className="textField"
            {...register("endDate", VacationdModel.endDateValidation)}
            helperText={errors.endDate?.message}
            focused
          />

          <TextField type="number" label="Price"
            {...register("price", VacationdModel.priceValidation)}
            helperText={errors.price?.message}
            focused />

          <FormControl>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image",VacationdModel.imageValidation)}
            required
            onChange={handleImageChange}
            className="imgFile"
          />
              
          </FormControl>
          {selectedImage && <img src={selectedImage} alt="Selected" />}

          <Button className="button" type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditVacation;