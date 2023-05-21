import { useForm } from 'react-hook-form';
import { TextField, Button } from "@mui/material";
import "./Register.css";
import UserModel from '../../../Models/User-model';
import authService from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import notifyService from "../../../Services/NotifyService"
function Register(): JSX.Element {

    const {register,handleSubmit}= useForm<UserModel>()
const navigate = useNavigate()
    async function send(user:UserModel){
try {
   await authService.register(user)
   notifyService.success("wellcome")
    navigate("/home")
} catch (err:any) {
    notifyService.error(err)
}
    }
    
    return (
        <div className="Register">
			 <form onSubmit={handleSubmit(send)}>
                <h3>Register</h3>
      <TextField
      className='textField'
        label="Firstname"
        name="firstname"
        // helperText={errors.name ? 'Name is required' : ''}
        {...register("firstName")}
      />
        <TextField
        className='textField'
        label="LastName"
        name="lastname"
        {...register("lastName")}
        // helperText={errors.name ? 'Name is required' : ''}
      />
      <TextField
      className='textField'
        label="Email"
        name="email"
        {...register("email")}
        // helperText={errors.email ? 'Email is required' : ''}
      />
      <TextField
      className='textField'
        label="Password"
        name="password"
        type="password"
        {...register("password")}
        // helperText={errors.password ? 'Password is required' : ''}
      />
      <Button type="submit" variant="contained" color="primary" className='submitButton'>
        Register
      </Button>
    </form>
        </div>
    );
}

export default Register;
