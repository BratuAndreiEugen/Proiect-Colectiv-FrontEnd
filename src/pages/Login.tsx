import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getLogger } from "../utils";
import useMediaQuery from "@mui/material/useMediaQuery";

const log = getLogger("Login");

interface LoginState {
  username?: string;
  password?: string;
}

export default function Login() {
  const isPhone = useMediaQuery("(max-width:420px)");
  const [state, setState] = useState<LoginState>({});
  const { username, password } = state;
  const { isAuthenticated, isAuthenticating, login, authenticationError } =
    useContext(AuthContext);
  const history = useHistory();

  const handleLogin = useCallback(() => {
    log("handleLogin...");
    if (!username) {
      alert("The username cannot be empty");
      return;
    }
    if (!password) {
      alert("The password cannot be empty");
      return;
    }
    login?.(username, password);
  }, [username, password]);

  useEffect(() => {
    if (isAuthenticated) {
      log("redirecting to home");
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: isPhone ? 20 : 18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setState({ ...state, username: e.target.value })}
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
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box alignItems="center" justifyContent="center" display="flex">
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
