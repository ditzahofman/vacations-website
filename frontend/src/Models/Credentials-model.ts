
class CredentialsModel {

    public email: string
    public password: string

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
export default CredentialsModel