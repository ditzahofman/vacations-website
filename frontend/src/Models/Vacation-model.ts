class VacationdModel{
    [x: string]: any
    findIndex(arg0: (v: any) => boolean) {
        throw new Error("Method not implemented.")
    }
        
    public vacationId: number
    public continentId:number
    public destination: string
    public description: string
    public startDate: string
    public endDate: string
    public price: number
    public image: FileList
    public imageName: string
    public isFollowing:boolean
    public followerCount:number

}

    export default VacationdModel