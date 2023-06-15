import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationdModel from "../../../Models/Vacation-model";
import { Button, FormControl, TextField } from "@mui/material";
import vacationService from "../../../Services/VacationService";
import ContinentSelectionForm from "../continentSelectionForm/continentSelectionForm";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";

import React, { useState } from "react";

function AddVacation(): JSX.Element {
  const user = authStore.getState().user;
  const navigate = useNavigate();
  if (!user) navigate("/login");

  const { register, handleSubmit } = useForm<VacationdModel>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  async function send(vacation: VacationdModel): Promise<void> {
    try {
      console.log(vacation);
      const addedvacation = await vacationService.addVacation(vacation);
      alert("The vacation was successfully added");
      navigate("/home");
    } catch (error) {
      alert(error);
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
  };

  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add Vacation</h2>
        <ContinentSelectionForm onSubmit={register("continentId")} />
        <TextField label="Destination" required {...register("destination")} focused />
        <br />
        <TextField label="Description" {...register("description")} required focused />
        <br />
        <TextField type="date" label="Start Date" {...register("startDate")} required focused />
        <br />
        <TextField type="date" label="End Date" {...register("endDate")} required focused />
        <br />
        <TextField type="number" label="Price" {...register("price")} required focused />
        <br />
        <FormControl>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
            required
            onChange={handleImageChange}
          />
        </FormControl>
        <br />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        <Button className="button" type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddVacation;

