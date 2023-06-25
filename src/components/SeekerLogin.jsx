import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import theme from "../theme";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const SeekerLogin = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, loginUser, loginGoogle } = UserAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const[wrong,setWrong] = useState(false);

  useEffect(() => {
    if(wrong){
        setErrorMessage("Invalid Account, Please use Employer portal.");
    }
}, [wrong])
  const [previousLocation, setPreviousLocation] = useState(null);

  const location = useLocation();
  useEffect(() => {
    setPreviousLocation(location.state?.from);
    console.log("Location: " + previousLocation);
    onPageLoad();
  }, [location.pathname]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      navigate("/register");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleLogin =(e) => {
    setErrorMessage("");
    e.preventDefault();

      loginUser(email, password)
        .then((loggedIn) => {
          if(loggedIn)
            {  
                navigate('/');
            }

        })
        .catch((error) => {setWrong(true);
        console.log(error.code);
        if(error.code=== null)
        setErrorMessage(error);
        else
        setErrorMessage(error.code);
        });
  };
  

  const handleGoogle = async(e) => {
    e.preventDefault();
   loginGoogle().then((loggedIn) => {
    
    if(loggedIn==="new")
      {   
          navigate('/register');
      }
      else if(loggedIn==="old")
      {
            navigate('/');
      }
    }) .catch((error) => {setWrong(true);
      console.log(error.code);
      if(error.code=== null)
      setErrorMessage(error);
      else
      setErrorMessage(error.code);
      });
}

  return (
    <Grid container overflow="auto">
      <Grid
        item
        md={8}
        height="100vh"
        sx={{ backgroundColor: "-moz-initial" }}
      ></Grid>

      <Grid
        container
        height="100vh"
        flexWrap="nowrap"
        flexDirection="column"
        overflow="auto"
        xs={12}
        md={4}
        sx={{
          boxShadow: 20,
          maxWidth: "100%",
        }}
      >
        <Typography
          variant="h3"
          mt={14}
          ml={4}
          fontSize={45}
          fontWeight={600}
          color={theme.typography.green}
        >
          <div className="notranslate">WorkAble</div>
        </Typography>

        {login ? (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h4"
              mt={2}
              ml={4}
              fontSize={25}
              fontWeight={600}
              color={theme.typography.heading1}
            >
              Login
            </Typography>
            <TextField
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              size="small"
              sx={{
                mt: 5,
                mx: 4,
              }}
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              size="small"
              sx={{
                mt: 2.5,
                mx: 4,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{
                mt: 3,
                mx: 4,
                fontWeight: 500,
                backgroundColor: theme.palette.primary.darker,
              }}
            >
              Log In
            </Button>
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                mt={2}
                ml={4}
                fontSize={14}
                fontWeight={400}
              >
                {errorMessage}
              </Typography>
            )}
          </form>
        ) : (
          <form
            onSubmit={handleSignup}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h4"
              mt={2}
              ml={4}
              fontSize={25}
              fontWeight={600}
              color={theme.typography.heading1}
            >
              Sign Up
            </Typography>
            <TextField
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              size="small"
              sx={{
                mt: 5,
                mx: 4,
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                mt: 2.5,
                mx: 4,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{
                mt: 3,
                mx: 4,
                fontWeight: 500,
                backgroundColor: theme.palette.primary.darker,
              }}
            >
              Sign Up
            </Button>
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                mt={2}
                ml={4}
                fontSize={14}
                fontWeight={400}
              >
                {errorMessage}
              </Typography>
            )}
          </form>
        )}

        <Button
          variant="outlined"
          size="small"
          onClick={handleGoogle}
          sx={{
            mt: 3,
            mx: 4,
            borderColor: "#afafaf",
            color: "#2f2f2f",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#efefef",
              borderColor: "#afafaf",
            },
          }}
        >
          Sign in with Google
        </Button>

        {login ? (
          <Typography
            variant="body2"
            mt={6}
            textAlign="center"
            fontSize={18}
            fontWeight={400}
          >
            Don't have an account?
            <span
              style={{
                color: theme.palette.primary.darker,
                fontWeight: 500,
                cursor: "pointer",
                wordWrap: "break-word",
                maxWidth: "full",
              }}
              onClick={() => {
                setLogin(!login);
              }}
            >
              Sign Up
            </span>
          </Typography>
        ) : (
          <Typography
            variant="body2"
            mt={6}
            textAlign="center"
            fontSize={18}
            fontWeight={400}
          >
            Already have an account?
            <span
              style={{
                color: theme.palette.primary.darker,
                fontWeight: 500,
                cursor: "pointer",
                wordWrap: "break-word",
                maxWidth: "full",
              }}
              onClick={() => {
                setLogin(!login);
              }}
            >
              Log In
            </span>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SeekerLogin;
