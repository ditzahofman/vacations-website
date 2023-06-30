import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationdModel from "../../../../Models/Vacation-model";
import { Button, FormControl, TextField } from "@mui/material";
import vacationService from "../../../../Services/VacationService";
import ContinentSelectionForm from "../../continentSelectionForm/continentSelectionForm";
import { useNavigate } from "react-router-dom"
import React, { useState } from "react";
import VacationModel from "../../../../Models/Vacation-model";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/UseVerifyAdmin";

function AddVacation(): JSX.Element {
  useVerifyAdmin()


  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors }, setError } = useForm<VacationModel>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function send(vacation: VacationModel): Promise<void> {
    try {
      console.log(vacation);
      if (vacation.endDate <= vacation.startDate) {
        setError("endDate", { message: "End date must be later than the start date" });
        return;
      }
      const addedVacation = await vacationService.addVacation(vacation);
      notifyService.success("The vacation was successfully added");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
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
    <div className="AddVacation">
      <div>

        <form onSubmit={handleSubmit(send)}>
          <h2>Add Vacation</h2>

          <ContinentSelectionForm onSubmit={register('continentId')} />

          <TextField label="Destination" className="textField"
            {...register("destination", VacationdModel.destinationValidation)}
            helperText={errors.destination?.message}
            focused />
          <TextField label="Brief" className="textField"
            {...register("brief", VacationdModel.briefValidation)}
            helperText={errors.brief?.message}
            focused />
            
          <TextField
            label="Description"
            className="textField"
            multiline
            rows={6}
            {...register("description", VacationdModel.descriptionValidation)}
            helperText={errors.description?.message}
            focused
          />

          <TextField type="date" label="Start Date" className="textField"
            {...register("startDate", VacationdModel.startDateValidation)}
            helperText={errors.startDate?.message}
            focused />

          <TextField type="date" label="End Date" className="textField"
            {...register("endDate", VacationdModel.endDateValidation)}
            helperText={errors.endDate?.message}
            focused
          />

          <TextField type="number" label="Price" className="textField"
            {...register("price", VacationdModel.priceValidation)}
            helperText={errors.price?.message}
            focused />

          <FormControl>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", VacationdModel.imageValidation)}
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
      <img />
    </div>
  );
}

export default AddVacation;

