import { useNavigate } from "react-router-dom";
import "./Login.css";
import CredentialsModel from "../../../Models/Credentials-model";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import notifyService from "../../../Services/NotifyService";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.loggin(credentials);
      notifyService.success("Welcome Back!!");
      navigate("/home");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Login">
      <Container component="main" maxWidth="xs" className="login">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1 }} className="lock">
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
              error={!!formState.errors.email?.message}
              helperText={formState.errors.email?.message}
              {...register('email', CredentialsModel.emailValidation)}
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
              error={!!formState.errors.password?.message}
              helperText={formState.errors.password?.message}
              {...register("password", CredentialsModel.passwordValidation)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              disabled={Object.values(formState.dirtyFields).length < 2}
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
                <NavLink to={"/register"}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
