import express, { Request, Response, NextFunction } from "express"
import logicFollowers from "../5-logic/follower-logic"
import FollowerModel from "../4-models/follower-model";

const router = express()



router.post("/followers", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body)
        const addFollower = await logicFollowers.addFollower(follower)
    return response.status(201).json(follower)
    } catch (err) {
        next(err)
    }
})

router.delete("/followers/:userId/:vacationId", async(request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.userId
        const vacation = +request.params.vacationId
       await logicFollowers.unFollow(id,vacation)
    return response.status(204).send("The folower is deleted")
    } catch (err) {
        next(err)
    }
})
export default router