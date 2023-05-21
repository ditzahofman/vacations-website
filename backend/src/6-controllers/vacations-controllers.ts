import express, { Request, Response, NextFunction } from "express"
import logicVacation from "../5-logic/logicVacation"
import VacationdModel from "../4-models/vacation-model"

const router = express()



//Get all vacations
router.get("/vacations", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logicVacation.getAllVacations()
        response.json(vacations)
    } catch (err) {
        next(err)
    }
})

//Get vacation by id
router.get("/vacations/:vacationId", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const vacations = await logicVacation.getOneVacation(vacationId)
        response.json(vacations)
    } catch (err) {
        next(err)
    }
})

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
router.delete("/vacations/delete/:vacationId([0-9]+)", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.vacationId
      await logicVacation.deleteVacation(id)
        response.sendStatus(204)
    } catch (err) {
        next(err)
    }
})

//Update vacation by id
router.put("/vacations/update/:vacationId([0-9]+)", async(request: Request, response: Response, next: NextFunction) => {
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