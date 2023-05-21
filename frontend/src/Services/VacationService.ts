import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationdModel from "../Models/Vacation-model";
import VacationModel from "../Models/Vacation-model";
import UserModel from "../Models/User-model";

class VacationService {

public async getAllVacations():Promise<VacationdModel[]>{

    const response = await axios.get<VacationModel[]>(appConfig.vacationUrl)
    const vacations = response.data
    return vacations
}

public async unFollower(userId:number,vacationId:number):Promise<void>{

    await axios.delete(appConfig.vacationUrl+userId+"/"+vacationId)
   
}



}

const vacationService = new VacationService();

export default vacationService;