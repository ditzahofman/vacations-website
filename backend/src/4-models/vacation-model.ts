import joi from "joi"
class VacationdModel{
        
    public vacationId:number
    public nameHotel:string
    public adress:string
    public location:string
    public description:string
    public fullDescription:string
    public startDate:string
    public endDate:string
    public hospitalyStyleId:number
    public pricePerNight:number
    public totalPrice:number
    public imageName:string

    public constructor(vacation:VacationdModel){
this.vacationId=vacation.vacationId
this.nameHotel=vacation.nameHotel
this.adress=vacation.adress
this.location=vacation.location
this.description=vacation.description
this.fullDescription=vacation.fullDescription
this.startDate=vacation.startDate
this.endDate=vacation.endDate
this.hospitalyStyleId=vacation.hospitalyStyleId
this.pricePerNight=vacation.pricePerNight
this.totalPrice=vacation.totalPrice
this.imageName=vacation.imageName
    }
 
    private static validationSchema=joi.object({
        vacationId:joi.number().optional().positive(),
        nameHotel:joi.string().min(3).max(30).required(),
        adress:joi.string().min(3).max(30).required(),
        location:joi.string().min(3).max(30).required(),
        description:joi.string().min(5).max(800).required(),
        fullDescription:joi.string().max(800).optional(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        pricePerNight:joi.number().required(),
        hospitalyStyleId:joi.number().required(),
        totalPrice:joi.number().required(),
        imageName:joi.string().optional()
     })
     
     public validate():string{
        const result = VacationdModel.validationSchema.validate(this )
        return result.error?.message
     }

}
export default VacationdModel