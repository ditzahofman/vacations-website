import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationdModel from "../../../../Models/Vacation-model";
import { Button, FormControl, IconButton, TextField } from "@mui/material";
import vacationService from "../../../../Services/VacationService";
import ContinentSelectionForm from "../../SharedArea/continentSelectionForm/continentSelectionForm";
import { useNavigate } from "react-router-dom"
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import VacationModel from "../../../../Models/Vacation-model";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/UseVerifyAdmin";
import { PhotoCamera } from "@mui/icons-material";
import continentModel from "../../../../Models/Continent-model";

function AddVacation(): JSX.Element {
  useVerifyAdmin()


  const navigate = useNavigate();


  const { register, handleSubmit, formState: { errors }, setError } = useForm<VacationModel>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  // On selected file changes
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // Set selected file
  const onSelectFile = (e: BaseSyntheticEvent): void => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

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


  return (
    <div className="AddVacation">
      <div>

        <form onSubmit={handleSubmit(send)}>
          <h2>Add Vacation</h2>

          <ContinentSelectionForm onSubmit={register('continentId', continentModel.continentValidation) } />
          <div className="errorContinent">{errors.continentId?.message}</div>
          
          <TextField label="Destination" className="textField"
            {...register("destination", VacationdModel.destinationValidation)}
            focused />
          <div className="error">{errors.destination?.message}</div>

          <TextField label="Brief" className="textField"
            {...register("brief", VacationdModel.briefValidation)}
            focused />
          <div className="error">{errors.brief?.message}</div>

          <TextField
            label="Description"
            className="textField"
            multiline
            rows={6}
            {...register("description", VacationdModel.descriptionValidation)}
            focused
          />
          <div className="error">{errors.description?.message}</div>

          <TextField type="date" label="Start Date" className="textField"
            {...register("startDate", VacationdModel.startDateValidation)}
            focused />
          <div className="error">{errors.startDate?.message}</div>

          <TextField type="date" label="End Date" className="textField"
            {...register("endDate", VacationdModel.endDateValidation)}
            focused
          />
          <div className="error">{errors.endDate?.message}</div>

          <TextField type="number" label="Price" className="textField"
            {...register("price", VacationdModel.priceValidation)}
            focused />
          <div className="error">{errors.price?.message}</div>

          <div className="Preview">
            <IconButton  aria-label="upload picture" component="label" title="Select Image">
              <input hidden type="file" accept="image/*" onChangeCapture={onSelectFile} {...register("image", VacationModel.imageValidation)} />
              <PhotoCamera />
            </IconButton>
            <img src={preview} width="70%" height="100px" alt='' />{/* preview for uploaded image */}
          </div>
          <div >{errors.image?.message}</div>

          <Button className="button" type="submit" variant="contained" color="primary">
           Add
          </Button>
        </form>
      </div>
      <img />
    </div>
  );
}

export default AddVacation;

