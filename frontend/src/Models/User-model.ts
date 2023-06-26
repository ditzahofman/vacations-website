import RoleModel from "./Role-model"
class UserModel{
    public userId:number
    public firstName:string
    public lastName:string
    public email:string
    public password:string
    public role:RoleModel


    public static firstNameValidation = {
        required: { value: true, message: 'Missing first name' },
        minLength: { value: 2, message: 'First name too short' },
        maxLength: { value: 50, message: 'First name too long' },
      }
      public static lastNameValidation = {
        required: { value: true, message: 'Missing last name' },
        minLength: { value: 2, message: 'Last name too short' },
        maxLength: { value: 50, message: 'Last name too long' },
      }
      public static emailValidation = {
        required: { value: true, message: 'Missing Email' },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid Email Address'
        }
      }
      public static passwordValidation = {
        required: { value: true, message: 'Missing password' },
        minLength: { value: 4, message: 'Password too short' },
        maxLength: { value: 20, message: 'Password too long' },
      }
}

    export default UserModel