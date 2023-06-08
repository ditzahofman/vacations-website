import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken"
import { Request } from "express";
import crypto from "crypto"
import RoleModel from "../4-models/role-model";

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

async function verifyAdmin (request: Request): Promise<boolean>  {

    // First check if user logged in
    const isLoggedIn = await verifyToken(request);
    // If not logged in
    if (!isLoggedIn) return false;
  
    // Extract token
    const header = request.header('authorization');
    const token = header.substring(7);
  
    // Extract container from token
    const container: any = jwt.decode(token);
  
    // Extract user
    const user: UserModel = container.user;
  
    // Return true if user is admin, otherwise return false
    return user.role === RoleModel.Admin;
  
  };
  
 async function verifyUser (request: Request): Promise<number>{
  
    // First check if user logged in
    const isLoggedIn = await verifyToken(request);
    // If not logged in
    if (!isLoggedIn) return null;
  
    // Extract token
    const header = request.header('authorization');
    const token = header.substring(7);
  
    // Extract container from token
    const container: any = jwt.decode(token);
  
    // Extract user
    const user: UserModel = container.user;
  
    // Return user
    return user.userId 
    
  };

function hash(plainSText:string){

    if(!plainSText)  return null
    const salt ="MakeThingsGoRight"
    const hashedText = crypto.createHmac('sha512',salt).update(plainSText).digest('hex')
    return hashedText
}

export default {
    getNewToken,
    verifyToken,
    hash,
    verifyAdmin,
    verifyUser
}