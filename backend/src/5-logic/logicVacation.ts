import { OkPacket } from "mysql"
import dal from "../2-utills/dal"
import VacationdModel from "../4-models/vacation-model"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models"
import { v4 } from "uuid"



async function getAllVacations(): Promise<VacationdModel[]> {
    const sql = ` SELECT v.*, COUNT(f.userId) AS followerCount
    FROM vacation v
    LEFT JOIN followers f ON v.vacationId = f.vacationId
    GROUP BY v.vacationId
    ORDER BY v.startDate ASC `

    const vacations = await dal.execute(sql)
    return vacations
}



async function getOneVacation(vcationId: number): Promise<VacationdModel> {
    const sql = `
    SELECT v.*, COUNT(f.userId) AS followerCount
    FROM vacation v
    LEFT JOIN followers f ON v.vacationId = f.vacationId
    WHERE v.vacationId = ?
    GROUP BY v.vacationId
  `
    const vacations = await dal.execute(sql, [vcationId])
    const vacation = vacations[0]
    return vacation
}

async function updateVacation(vacation: VacationdModel): Promise<VacationdModel> {

    const error = vacation.validate()
    if (error) throw new ValidationErrorModel(error)

    if (vacation.image) {
        const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = v4() + extention
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName)
        delete vacation.image
    }
    
    const sql = `
    UPDATE vacation
    SET
    destination = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [

        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageName,
        vacation.vacationId])

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation

}

async function addVacation(vacation: VacationdModel): Promise<VacationdModel> {

    const error = vacation.validate()
    if (error) throw new ValidationErrorModel(error)

    if (vacation.image) {
        const extention = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = v4() + extention
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName)
        delete vacation.image
    }

    const sql = `
    INSERT INTO vacation VALUES( DEFAULT, ? ,? ,? ,? ,? ,? )`

    const info: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageName
    ])
    vacation.vacationId = info.insertId
    return vacation

}

async function deleteVacation(id: number): Promise<void> {
    const sql = `DELETE FROM vacation 
    WHERE vacationId = ? `

    const info: OkPacket = await dal.execute(sql, [id])
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)

}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    deleteVacation,
    updateVacation
}