import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm } from "react-hook-form";
import { register as registerRequest } from "../requests/authService";
import { IonImg } from "@ionic/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router";
import classes from "./Register.module.css"

export interface RegisterFieldValues {
  username: string;
  email: string;
  confirmPassword: string;
  passwordHash: string;
  bio: string;
}

export default function Register() {
  const methods = useForm<RegisterFieldValues>();
  const { register, handleSubmit } = useForm<RegisterFieldValues>();
  const isPhone = useMediaQuery("(max-width:450px)");
  const { isAuthenticated, isAuthenticating, login, authenticationError } =
    useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: RegisterFieldValues) => {
    console.log(data);
    try {
      await registerRequest(data);
      if (login) {
        login(data.email, data.passwordHash);
      }
      history.push("/");
    } catch (error) {
      console.error("Error during registration or login:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: isPhone ? 4 : 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IonImg src="/bucatar.jpeg" className={classes.bucatar} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form {...methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="family-name"
                  {...register("username")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("passwordHash")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
              </Grid>
              <Grid item xs={12}>
                <Textarea
                  required
                  fullWidth
                  label="Bio"
                  id="bio"
                  autoComplete="bio"
                  {...register("bio")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <IonImg src="/meal.png" className={classes.meal} />
      </Box>
    </Container>
  );
}
