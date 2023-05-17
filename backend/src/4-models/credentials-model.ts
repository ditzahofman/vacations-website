import joi from "joi"

class CredentialsModel{
public email: string
public password:string

public constructor(credentials:CredentialsModel){
    this.email = credentials.email
    this.password = credentials.password
}

public static validationSchema = joi.object({
    email:joi.string().required(),
    password:joi.string().required()
})

public validate():string{
    const result = CredentialsModel.validationSchema.validate(this)
   return result.error?.message
}
}
export default CredentialsModel