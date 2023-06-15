import { useNavigate } from "react-router-dom";
import "./Login.css";
import CredentialsModel from "../../../Models/Credentials-model";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from "@mui/icons-material";

function Login(): JSX.Element {

  const { register, handleSubmit } = useForm<CredentialsModel>()
  const navigate = useNavigate()
  async function send(credentials: CredentialsModel) {
    try {
      authService.loggin(credentials)
      alert("wellcome")
      navigate("/home")
    } catch (err: any) {
      alert(err.message)
    }
  }
  return (
    <div className="Login">
      <Container className="login" component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1} }className="lock">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(send)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to={"/register"} >
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

    </div>
  );
}

export default Login;
