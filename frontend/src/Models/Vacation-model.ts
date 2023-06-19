class VacationdModel{     
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

    public static destinationValidation = {
        required: { value: true, message: 'Missing destination' },
        minLength: { value: 2, message: 'Destination too short' },
        maxLength: { value: 100, message: 'Destination too long' },
      }
      public static descriptionValidation = {
        required: { value: true, message: 'Missing description' },
        minLength: { value: 5, message: 'Description too short' },
        maxLength: { value: 500, message: 'Description too long' },
      }
      public static startDateValidation = {
        required: { value: true, message: 'Missing start date' }
      }
      public static endDateValidation = {
        required: { value: true, message: 'Missing end date' }
      }
      public static priceValidation = {
        required: { value: true, message: 'Missing price' },
        min: { value: 1, message: 'Invalid price' },
        max:{value:10000 , message:"Do not enter a price higher than 10000"}
      }
      public static imageValidation = {
        required: { value: true, message: 'Missing image' }
      }

}

    export default VacationdModel