import express, { Request, Response, NextFunction } from "express"
import logicVacation from "../5-logic/logicVacation"
import VacationdModel from "../4-models/vacation-model"
import blockNonLogedIn from "../3-middleware/verify-logged-in"
import path from "path"
const router = express()



//Get all vacations
router.get("/vacations/:userId",async(request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacations = await logicVacation.getAllVacations(userId)
        response.json(vacations)
    } catch (err) {
        next(err)
    }
})
//get vacationImage
router.get("/vacations/images/:imageName" ,async(request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName
        const absolutePath = path.join(__dirname,"..","1-assets","images",imageName)
        response.sendFile(absolutePath)
    } catch (err) {
        next(err)
    }
})

//Get vacation by id
// router.get("/vacations/:vacationId", async(request: Request, response: Response, next: NextFunction) => {
//     try {
//         const vacationId = +request.params.vacationId
//         const vacations = await logicVacation.getOneVacation(vacationId)
//         response.json(vacations)
//     } catch (err) {
//         next(err)
//     }
// })

//Add new vacation
router.post("/vacations", async(request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
        const vacation = new VacationdModel(request.body)
        const addedVacation= await logicVacation.addVacation(vacation)
        response.status(201).json(addedVacation)
    } catch (err) {
        next(err)
    }
})

//Delete vacation by id
router.delete("/vacations/:vacationId([0-9]+)", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.vacationId
      await logicVacation.deleteVacation(id)
        response.sendStatus(204)
    } catch (err) {
        next(err)
    }
})

//Update vacation by id
router.put("/vacations/:vacationId([0-9]+)", async(request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image
       request.body.vacationId = +request.params.vacationId
        const vacation = new VacationdModel(request.body)
      const updateVacation = await logicVacation.updateVacation(vacation)
        response.sendStatus(204).json(updateVacation)
    } catch (err) {
        next(err)
    }
})
export default router