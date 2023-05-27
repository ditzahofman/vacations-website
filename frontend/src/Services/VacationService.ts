import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationdModel from "../Models/Vacation-model";
import VacationModel from "../Models/Vacation-model";
import UserModel from "../Models/User-model";
import FollowerModel from "../Models/Follower-model";

class VacationService {

public async getAllVacations(userId:number):Promise<VacationdModel[]>{

    const response = await axios.get<VacationModel[]>(appConfig.vacationUrl+userId)
    const vacations = response.data
    return vacations
}

public async unFollower(userId:number,vacationId:number):Promise<void>{

    await axios.delete(appConfig.followerUrl+userId+"/"+vacationId)
  
   
}

public async addFollower(userId:number,vacationId:number):Promise<FollowerModel>{

    const response =await axios.post(appConfig.followerUrl,{userId,vacationId})
   const addFollower = response.data
   return addFollower
   
}


}

const vacationService = new VacationService();

export default vacationService;