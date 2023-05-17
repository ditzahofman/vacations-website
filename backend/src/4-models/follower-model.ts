class FollowerModel{
    public userId:number
    public vacationId:number
   

    public constructor(followerModel:FollowerModel){
        this.userId = followerModel.userId
        this.vacationId = followerModel.vacationId
    }
}
export default FollowerModel