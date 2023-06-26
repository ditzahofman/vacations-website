import express, { Request, Response, NextFunction } from "express"
import authLogic from "../5-logic/auth-logic"
import UserModel from "../4-models/user-model"
import CredentialsModel from "../4-models/credentials-model"

const router = express.Router()


router.get("/users" , async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const users = await authLogic.getAllUsers()
        response.json(users)   
    } catch (err:any) {
        next(err)
    }
    
    })

router.post("/register" , async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        response.json(token)   
    } catch (err:any) {
        next(err)
    }
    
    })

    router.post("/login" , async(request:Request,response:Response,next:NextFunction)=>{
        try {
        
            const user = new CredentialsModel(request.body)
            
            const token = await authLogic.login(user)
            response.json(token)   
        } catch (err:any) {
            next(err)
        }
        
        })


    export default router