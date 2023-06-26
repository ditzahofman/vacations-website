import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, Box, Container, CssBaseline, Avatar, Typography, FormControlLabel, Checkbox } from "@mui/material";
import "./Register.css";
import UserModel from '../../../Models/User-model';
import authService from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import notifyService from "../../../Services/NotifyService"
import { Copyright } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink } from 'react-router-dom';

function Register(): JSX.Element {

  const { register, handleSubmit, formState } = useForm<UserModel>()
  const navigate = useNavigate()
  async function send(user: UserModel) {
    try {
      await authService.register(user)
      notifyService.success("wellcome")
      navigate("/home")
    } catch (err: any) {
      notifyService.error(err)
    }
  }

  return (
    <div className="Register">
      <div >
        <Container component="main" maxWidth="xs" className='register'>
          <CssBaseline />
          <Box
            sx={{
              paddingnTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Avatar sx={{ m: 1 }} className='lock'>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(send)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!formState.errors.firstName?.message}
                    helperText={formState.errors.firstName?.message}
                    {...register("firstName", UserModel.firstNameValidation)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    autoFocus
                    error={!!formState.errors.lastName?.message}
                    helperText={formState.errors.lastName?.message}
                    {...register("lastName", UserModel.lastNameValidation)}
                  />
                </Grid>
                <Grid item xs={12}>
      
                 <TextField
                 fullWidth
                 id="email"
                 label="Email Address"
                 name="email"
                 type="email"
                 autoComplete="email"
                 error={!!formState.errors.email?.message}
                 helperText={formState.errors.email?.message}
                 {...register('email', UserModel.emailValidation)}
               />
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!formState.errors.password?.message}
                    helperText={formState.errors.password?.message}
                    {...register("password", UserModel.passwordValidation)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                className='submit'
                type="submit"
                disabled={Object.values(formState.dirtyFields).length < 4}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to={'/login'}>
                    Already have an account? Sign in
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>

      </div></div>

  );
}

export default Register;
