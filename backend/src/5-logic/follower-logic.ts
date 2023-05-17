import { OkPacket } from "mysql";
import dal from "../2-utills/dal";
import FollowerModel from "../4-models/follower-model";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";



async function addFollower(follower:FollowerModel): Promise<FollowerModel> {
    const sql = `INSERT INTO followers VALUES(?,?)`
   const addFollower:OkPacket=  await dal.execute(sql, [
    follower.userId ,
     follower.vacationId])
return follower
   
}

async function unFollow(userId:number,vacationId:number): Promise<void> {
    const sql = `DELETE FROM followers WHERE followers.userId = ? AND followers.vacationId = ?`
   const info:OkPacket=  await dal.execute(sql, [userId , vacationId])
if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(userId)
   
}

export default {
    
    addFollower,
    unFollow
}