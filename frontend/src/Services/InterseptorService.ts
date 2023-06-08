import axios from "axios"
import { authStore } from "../Redux/AuthState"

class InterseptoreService{


    public  createInterseptors():void{
axios.interceptors.request.use(request =>{
    if(authStore.getState().token){
        request.headers = {
            authorization: "Baerer "+authStore.getState().token
        }
    }
    return request
})
    }
}
const interseptoreService = new InterseptoreService()
export default interseptoreService