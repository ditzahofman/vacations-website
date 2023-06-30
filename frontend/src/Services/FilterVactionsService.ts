
import {  vacationsStore } from "../Redux/VacationsState"

class FilterVacationsService{

   public filterByFormUser(continentId:number,stratDate:string,price:number){
    const vacations=vacationsStore.getState().vacations
    if(vacations.length>0){
      const newVacations=  
      vacations.filter((v)=>v.continentId===continentId && v.startDate>stratDate && v.price<=price )
                   return newVacations 
    }
alert("we dont have any vacation in this continent")
    }


}
const filterVacationsService = new FilterVacationsService()
export default filterVacationsService