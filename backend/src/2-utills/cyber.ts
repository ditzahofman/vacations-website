import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken"
import { Request } from "express";
import crypto from "crypto"

const secretkey = "vacationsTours"

function getNewToken(user:UserModel):string{

    delete user.password
    const container ={user}
    const options =  {expiresIn:"4h"}
    const token = jwt.sign(container,secretkey,options)
    return token
}

function verifyToken(request:Request):Promise<boolean>{
    return new Promise((resolve , reject)=>{
        try {
            const header = request.header("authorization")
        if(!header){
            resolve(false)
            return
        }
        const token = header.substring(7)
        if(!token){
            resolve(false)
            return
        }
        jwt.verify(token , secretkey,err=>{
            if(err){
                resolve(false)
            }
            resolve(true)
        })
        } catch (err:any) {
            reject(err)
            
        }
        
    })

}



function hash(plainSText:string){

    if(!plainSText)  return null
    const salt ="MakeThingsGoRight"
    const hashedText = crypto.createHmac('sha512',salt).update(plainSText).digest('hex')
    return hashedText
}

export default {
    getNewToken,
    verifyToken,
    hash
}