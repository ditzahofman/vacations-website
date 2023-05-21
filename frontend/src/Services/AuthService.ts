import axios from "axios";
import UserModel from "../Models/User-model";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/Credentials-model";

class AuthService {

    public async register(user: UserModel): Promise<void> {

        const response = await axios.post<string>(appConfig.registerUrl, user)

        const token = response.data

        //send token to redux
        authStore.dispatch({type:AuthActionType.Register, payload:token})

    }

    public async loggin(credentials: CredentialsModel): Promise<void> {

        const response = await axios.post<string>(appConfig.loginUrl, credentials)

        const token = response.data

        //send token to redux
        authStore.dispatch({type:AuthActionType.Loggin, payload:token})

    }

    public  logout():void{
        authStore.dispatch({type:AuthActionType.Logout})
    }
}

const authService = new AuthService()
export default authService