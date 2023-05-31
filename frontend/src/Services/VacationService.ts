import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationdModel from "../Models/Vacation-model";
import VacationModel from "../Models/Vacation-model";
import UserModel from "../Models/User-model";
import FollowerModel from "../Models/Follower-model";
import { vacationActionType, vacationsStore } from "../Redux/VacationsState";

class VacationService {

    public async getAllVacations(userId: number): Promise<VacationdModel[]> {

        const response = await axios.get<VacationModel[]>(appConfig.vacationUrl + userId)
        const vacations = response.data
        // send vacations to redux 

        vacationsStore.dispatch({ type: vacationActionType.FetchVacations, paylod: vacations })

        return vacations
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.post(appConfig.vacationUrl, vacation)
        const addVacation = response.data

        vacationsStore.dispatch({ type: vacationActionType.AddVacation, paylod: addVacation })

    }

    public async unFollower(userId: number, vacationId: number): Promise<void> {

        await axios.delete(`${appConfig.followerUrl}${userId}/${vacationId}`)

        // send follwer to delete to redux 
        vacationsStore.dispatch({ type: vacationActionType.DeleteFollower, paylod: vacationId })

    }


    public async addFollower(userId: number, vacationId: number): Promise<FollowerModel> {

        const response = await axios.post(appConfig.followerUrl, { userId, vacationId })

        const addFollower = response.data
        // send addFollwer to redux 
        vacationsStore.dispatch({ type: vacationActionType.AddFollower, paylod: vacationId })

        return addFollower

    }


}

const vacationService = new VacationService();

export default vacationService;