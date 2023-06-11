import axios from "axios";
import appConfig from "../Utils/AppConfig";
import VacationdModel from "../Models/Vacation-model";
import VacationModel from "../Models/Vacation-model";
import UserModel from "../Models/User-model";
import FollowerModel from "../Models/Follower-model";
import { vacationActionType, vacationsStore } from "../Redux/VacationsState";
import continentModel from "../Models/Continent-model";

class VacationService {

    public async getAllContinents():Promise<continentModel[]>{
        const response = await axios.get(appConfig.continentUrl)
        const continents = response.data
        return continents
    }

    public async getAllVacations(): Promise<VacationdModel[]> {

        const response = await axios.get<VacationModel[]>(appConfig.vacationUrl )
        const vacations = response.data
        // send vacations to redux 

        vacationsStore.dispatch({ type: vacationActionType.FetchVacations, paylod: vacations })

        return vacations
    }

    public async getVacationPackege(userId:number,continent:number,stratDate:string,price:number):Promise<VacationdModel[]>{ 

        const response = await axios.get<VacationModel[]>(`${appConfig.vacationPackageUrl}/${userId}/${continent}/${stratDate}/${price}`)
        const vacationsPockage = response.data
        // send vacations to redux 

        vacationsStore.dispatch({ type: vacationActionType.FetchVacations, paylod: vacationsPockage })

        return vacationsPockage
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData() 
        formData.append("continentId",vacation.continentId.toString())
        formData.append("destination",vacation.destination)
        formData.append("description",vacation.description)
        formData.append("startDate",vacation.startDate)
        formData.append("endDate",vacation.endDate)
        formData.append("price",vacation.price.toString())
        formData.append("image",vacation.image[0])
        const response = await axios.post(appConfig.vacationUrl,formData )
        const addVacation = response.data

        vacationsStore.dispatch({ type: vacationActionType.AddVacation, paylod: addVacation })

    }


    public async deleteVacation(vacationId:number): Promise<void> {
       await axios.delete(appConfig.vacationUrl+vacationId)

        vacationsStore.dispatch({ type: vacationActionType.DeleteVacation, paylod: vacationId })

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