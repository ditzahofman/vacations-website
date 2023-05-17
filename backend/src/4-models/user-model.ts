import joi from "joi"
import RoleModel from "./role-model"
class UserModel{
public userId:number
public firstName:string
public lastName:string
public email:string
public password:string
public role:RoleModel

constructor(user:UserModel){
this.userId = user.userId
this.firstName = user.firstName
this.lastName= user.lastName
this.email = user.email
this.password = user.password
this.role = user.role
}
 private static validationSchema=joi.object({
    userId:joi.number().optional().positive(),
    firstName:joi.string().min(3).max(10).required(),
    lastName:joi.string().min(3).max(10).required(),
    email:joi.string().min(3).required().email(),
    password:joi.string().min(8).required(),
    role:joi.string()
 })
//  .alphanum().uppercase()
 public validate():string{
    const result = UserModel.validationSchema.validate(this )
    return result.error?.message
 }
}
export default UserModel