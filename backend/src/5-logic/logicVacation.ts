import { OkPacket } from "mysql"
import dal from "../2-utills/dal"
import VacationdModel from "../4-models/vacation-model"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models"
import { v4 as uuid } from "uuid"
import ContinentModel from "../4-models/continent-model"
import fs from "fs"
import path from "path"
//get all continent
async function getAllContinents(): Promise<ContinentModel[]> {
    const sql = `SELECT * FROM continents`
    const continents = await dal.execute(sql)
    return continents
}


//get all vacations with all details
async function getAllVacations(userId: number): Promise<VacationdModel[]> {
    const sql = `SELECT V.* , 
EXISTS(SELECT * FROM followers  WHERE followers.vacationId =v.vacationId and followers.userId = ? ) as isFollowing
,COUNT(f.userId)   AS followerCount
FROM vacation AS v LEFT JOIN followers AS F
ON V.vacationId = F.vacationId
GROUP by v.vacationId
ORDER by v.startDate;`
    const vacations = await dal.execute(sql, [userId])
    return vacations
}


//Get Vacation package according to the customer's wishes
async function vacationPackageAccordingToCustomer(userId: number, continent: number, stratDate: string, price: number): Promise<VacationdModel[]> {
    const sql = `SELECT V.* , 
EXISTS(SELECT * FROM followers  WHERE followers.vacationId =v.vacationId and followers.userId =? ) as isFollowing
,COUNT(f.userId)   AS followerCount
FROM vacation AS v LEFT JOIN followers AS F
ON V.vacationId = F.vacationId
WHERE v.continentId = ? AND v.startDate> ?  AND v.price< ?
GROUP by v.vacationId
ORDER by v.startDate;`

    const vacations = await dal.execute(sql, [userId, continent, stratDate, price])
    return vacations
}

//get one vacation by id
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

  
    // Save image to disk if new image was uploaded
    if (vacation.image) {
        // Delete current image
        deleteImage(vacation);
        // Save new image to disk
        saveImage(vacation);
        // Don't save new image in the database
        delete vacation.image;
      }
    else{
        vacation.imageName=vacation.imageName
    }

    const sql = `
    UPDATE vacation
    SET
    continentId = ?,
    destination = ?,
    brief = ?,
    description = ?,
    startDate = ?,
    endDate = ?,
    price = ?,
    imageName = ?
    WHERE vacationId = ?`

    const info: OkPacket = await dal.execute(sql, [

        vacation.continentId,
        vacation.destination,
        vacation.brief,
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

    if (await isDuplicatedVacation(vacation)) {
        throw new ValidationErrorModel(`A vacation to ${vacation.destination} on these dates is in the list of vacations`);
      }
   // Save image to disk if new image was uploaded
   if (vacation.image) {
       // Save new image to disk
    saveImage(vacation);
    // Don't save new image in the database
    delete vacation.image;
  }

    const sql = `
    INSERT INTO vacation VALUES( DEFAULT, ? ,? ,? ,? ,? ,?,?,? )`

    const info: OkPacket = await dal.execute(sql, [
        vacation.continentId,
        vacation.destination,
        vacation.brief,
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

    const vacation = await getOneVacation(id)
    const sql = `DELETE FROM vacation 
    WHERE vacationId = ? `

    const info: OkPacket = await dal.execute(sql, [id])
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)
    //delete the image
    fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);

}

// Duplication validation
const isDuplicatedVacation = async (vacation: VacationdModel): Promise<boolean> => {
    // Query
    const sql = `
      SELECT COUNT(*) AS count
      FROM vacation
      WHERE  continentId = ? AND destination = ?AND brief = ? AND description = ? AND startDate = ? AND endDate = ? AND price = ?
    `;
  
    // Execute
    const result = await dal.execute(sql, [vacation.continentId ,vacation.destination, vacation.brief,vacation.description, vacation.startDate, vacation.endDate, vacation.price]);
    
    // Check if already exists
    return result[0].count > 0;
  };

// Images path
const imagesPath = path.join(__dirname, '..', '1-assets', 'images');

// Delete existing image
function deleteImage(vacation: VacationdModel) {
    if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {

        // Delete it:
        fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
    }
};

// Save new image in file system
async function saveImage(vacation: VacationdModel): Promise<void> {
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf('.'));
    vacation.imageName = uuid() + extension;
    const image = path.join(imagesPath, vacation.imageName);
    await vacation.image.mv(image);
};

export default {
    getAllContinents,
    vacationPackageAccordingToCustomer,
    getAllVacations,
    getOneVacation,
    addVacation,
    deleteVacation,
    updateVacation,

}