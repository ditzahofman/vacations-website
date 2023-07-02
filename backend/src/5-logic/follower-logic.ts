import { OkPacket } from "mysql";
import dal from "../2-utills/dal";
import FollowerModel from "../4-models/follower-model";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";



  // Check if user is following specific vacation
async function checkIfFollowed(follower:FollowerModel): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM followers WHERE userId =? AND vacationId =?) AS isFollowed`;
  
    const isFollowed = await dal.execute(sql, [follower.userId , follower.vacationId]);
  
    // Returns true if following
    return isFollowed[0].isFollowed === 1;
  }



async function addFollower(follower:FollowerModel): Promise<FollowerModel> {

    const isFollowed= await checkIfFollowed(follower)
    if(isFollowed ){
    throw new ValidationErrorModel("You are already following this vacation")
    }
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
    unFollow,
 
}