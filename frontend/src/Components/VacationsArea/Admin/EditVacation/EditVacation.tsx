import { useForm } from "react-hook-form";
import "./EditVacation.css";
import { Button, FormControl, IconButton, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import vacationService from "../../../../Services/VacationService";
import utils from "../../../../Utils/utils";
import VacationdModel from "../../../../Models/Vacation-model";
import ContinentSelectionForm from "../../SharedArea/continentSelectionForm/continentSelectionForm";
import notifyService from "../../../../Services/NotifyService";
import useVerifyAdmin from "../../../../Utils/UseVerifyAdmin";
import appConfig from "../../../../Utils/AppConfig";
import { PhotoCamera } from "@mui/icons-material";



function EditVacation(): JSX.Element {

  useVerifyAdmin()
  const navigate = useNavigate();
  const params = useParams()


  const { register, handleSubmit, setValue, formState: { errors }, setError } = useForm<VacationdModel>();
  const [vacation, setVacation] = useState<VacationdModel>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

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
        setValue("imageName", v?.imageName);
      })
      .catch((err) => alert(err.message));
  }, []);

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
            {...register("startDate", VacationdModel.updateStartDateValidation)}
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
            <IconButton color="primary" aria-label="upload picture" component="label" title="Select a picture">
              <input hidden type="file" accept="image/*" onChangeCapture={onSelectFile} {...register("image")} />
            <PhotoCamera />
            </IconButton>
            {
              preview ?
              <img src={preview} width="50%"  alt={vacation?.imageName} /> : // preview for new uploaded image
              <>
                {/* preview for current image from backend */}
                <img src={appConfig.vacationImagesUrl + vacation?.imageName} width="50%" alt={vacation?.imageName} />
                {/* <input type="hidden" {...register("imageName")} /> */}
              </>
            }
          </div>
          <Button className="button" type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditVacation;