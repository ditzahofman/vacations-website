import fileUpload, { UploadedFile } from "express-fileupload"
import joi from "joi"
class VacationdModel {
    public vacationId: number
    public continentId: number
    public destination: string
    public brief:string
    public description: string
    public startDate: string
    public endDate: string
    public price: number
    public image: UploadedFile
    public imageName: string



    public constructor(vacation: VacationdModel) {
        this.vacationId = vacation.vacationId
        this.continentId = vacation.continentId
        this.destination = vacation.destination
        this.brief=vacation.brief
        this.description = vacation.description
        this.startDate = vacation.startDate
        this.endDate = vacation.endDate
        this.price = vacation.price
        this.image = vacation.image
        this.imageName = vacation.imageName


    }

    private static validationSchema = joi.object({
        vacationId: joi.number().optional().positive(),
        continentId:joi.number().required().positive(),
        destination: joi.string().min(3).max(50).required(),
        brief:joi.string().min(5).max(500).required(),
        description: joi.string().min(5).max(10000).required(),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        price: joi.number().positive().max(10000).required(),
        image: joi.object().optional(),
        imageName: joi.string().optional()

    })

    public validate(): string {
        const result = VacationdModel.validationSchema.validate(this)
        return result.error?.message
    }

}
export default VacationdModel