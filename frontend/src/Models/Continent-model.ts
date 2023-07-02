class continentModel{
public continentId:number
public continentName:string

public static continentValidation = {
    required: { value: true, message: 'Missing continent' }
}
}
const cintinentModel = new continentModel()
export default continentModel