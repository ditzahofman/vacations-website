import { useNavigate } from "react-router-dom";
import "./Login.css";
import CredentialsModel from "../../../Models/Credentials-model";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import { Button, Link, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";


function Login(): JSX.Element {

    const {register,handleSubmit}= useForm<CredentialsModel>()
    const navigate = useNavigate()
        async function send(credentials:CredentialsModel){
    try {
        authService.loggin(credentials)
        alert("wellcome")
        navigate("/home")
    } catch (err:any) {
        alert(err.message)
    }
        }
    return (
        <div className="Login">
            <form  onSubmit={handleSubmit(send)}>
                
                <h3>Loggin</h3>
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
        Loggin
      </Button>
      <div className="register-link">
        <span>Not registered?</span>
        <NavLink to="/register" color="primary"> Register here.</NavLink>
      </div>
    </form>
        </div>
    );
}

export default Login;
