import { useForm } from "react-hook-form";
import "./EditVacation.css";
import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import vacationService from "../../../../Services/VacationService";
import utils from "../../../../Utils/utils";
import VacationdModel from "../../../../Models/Vacation-model";
import ContinentSelectionForm from "../../continentSelectionForm/continentSelectionForm";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/UseVerifyAdmin";
import continentModel from "../../../../Models/Continent-model";
import appConfig from "../../../../Utils/AppConfig";



function EditVacation(): JSX.Element {

  useVerifyAdmin()
  const navigate = useNavigate();
  const params = useParams()


  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<VacationdModel>();
  const [vacation, setVacation] = useState<VacationdModel>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const id = +params.vacationId;
    vacationService
      .getOneVacation(id)
      .then((v) => {
        setVacation(v)
        setValue("vacationId", v.vacationId);
        setValue("destination", v.destination);
        setValue("brief", v.brief);
        setValue("description", v.description);
        setValue("startDate", utils.formatDate(v.startDate));
        setValue("endDate", utils.formatDate(v.endDate));
        setValue("price", v.price);
        setValue("imageName", v.imageName);
      })
      .catch((err) => alert(err.message));
  }, []);



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

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  return (
    <div className="EditVacation">
      <div>

        <form onSubmit={handleSubmit(send)}>

          <h2>Edit Vacation</h2>

          <input type="hidden" {...register("vacationId")} />

          {vacation !== null && (
            <ContinentSelectionForm
              onSubmit={register("continentId")}
              defaultValue={vacation.continentId}
            />
          )}
          <TextField label="Destination" className="textField"
            {...register("destination", VacationdModel.destinationValidation)}
            helperText={errors.destination?.message}
            focused
          />
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
          <label>Image: </label>
          <img src={vacation && appConfig.vacationImagesUrl + vacation?.imageName} />
          <input type="file" accept="image/*" onChange={imageChange} defaultValue={vacation?.imageName} {...register("image")} />
          {/* {vacation !== null && (
          <FormControl
            style={{
              backgroundImage: `url(${appConfig.vacationImagesUrl}${vacation?.imageName})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              height: '100%',
            }}
          >
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", VacationdModel.imageValidation)}
              required
              onChange={imageChange}
              className="imgFile"
            />
            {selectedImage && <img src={selectedImage} alt="Selected" />}
          </FormControl>
        )} */}


          <Button className="button" type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditVacation;