import { OkPacket } from "mysql"
import dal from "../2-utills/dal"
import HospitalyStyleModel from "../4-models/hospitalyStyle-model"
import VacationdModel from "../4-models/vacation-model"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models"

async function getAllHospitalyStyle(): Promise<HospitalyStyleModel[]> {
    const sql = "SELECT * FROM hospitalyStyle"
    const HospitalyStyle = await dal.execute(sql)
    return HospitalyStyle
}

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

    const sql = `
    UPDATE vacation
    SET
    nameHotel = ?,
    location = ?,
    adress = ?,
    description = ?,
    fullDescription = ?,
    startDate = ?,
    endDate = ?,
    hospitalyStyleId = ?,
    pricePerNight = ?,
    totalPrice = ?,
    imageName = ?
    WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [
        vacation.nameHotel,
        vacation.location,
        vacation.adress,
        vacation.description,
        vacation.fullDescription,
        vacation.startDate,
        vacation.endDate,
        vacation.hospitalyStyleId,
        vacation.pricePerNight,
        vacation.totalPrice,
        vacation.imageName,
        vacation.vacationId])

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation

}

async function addVacation(vacation: VacationdModel): Promise<VacationdModel> {

    const error = vacation.validate()
    if (error) throw new ValidationErrorModel(error)


    const sql = `
    INSERT INTO vacation VALUES( DEFAULT,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? )`

    const info: OkPacket = await dal.execute(sql, [
        vacation.nameHotel,
        vacation.location,
        vacation.adress,
        vacation.description,
        vacation.fullDescription,
        vacation.startDate,
        vacation.endDate,
        vacation.hospitalyStyleId,
        vacation.pricePerNight,
        vacation.totalPrice,
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
    getAllHospitalyStyle,
    addVacation,
    deleteVacation,
    updateVacation
}