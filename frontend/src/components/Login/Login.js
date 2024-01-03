import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useMediaQuery } from "@mui/material";
const labelStyle = { mt: 1, mb: 2 };

const Login = (props) => {
  const navigate = useNavigate();

  const crossHandler = () => {
    navigate("/");
  };
  const [data, setdata] = useState({ email: "", password: "" });
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail") || "";
    const storedPassword = localStorage.getItem("signupPassword") || "";

    setdata({
      email: storedEmail,
      password: storedPassword,
    });
  }, []);

  const { email, password } = data;
  function handelform(e) {
    setdata({ ...data, [e.target.name]: e.target.value });
  }
  function submitform(e) {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .post(`${apiUrl}/login`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        props.onLogin(response.data);
        toast.success("Login successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          onClose: () => {
            navigate("/");
            props.onLogin(response.data);
          },
        });
      })
      .catch((error) => {
        console.error(error.response.data);

        toast.error("invalid user", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });

    console.log(data);
  }
  const media = useMediaQuery("(max-width:400px)");
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 20, marginTop: media ? "5rem" : "null" },
      }}
      open={true}
    >
      <Box sx={{ ml: "auto", padding: 1, marginTop: media ? "1rem" : "null" }}>
        <IconButton onClick={crossHandler}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" textAlign={"center"}>
        {" "}
        Login
      </Typography>

      <form onSubmit={submitform}>
        <Box
          padding={6}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
          margin={"auto"}
          alignContent={"center"}
        >
          {" "}
          <label sx={labelStyle}>Email</label>
          <TextField
            variant="standard"
            margin="normal"
            type="email"
            name="email"
            value={email}
            onChange={handelform}
          />
          <label sx={labelStyle}>Password</label>
          <TextField
            variant="standard"
            margin="normal"
            type="password"
            name="password"
            value={password}
            onChange={handelform}
          />
          <Button
            sx={{
              mt: 2,
              borderRadius: 10,
              bgcolor: "#2b2d42",
              width: media ? "30%" : "null",
              marginLeft: media ? "2rem" : "null",
            }}
            type="submit"
            name="submit"
            fullWidth
            variant="contained"
          >
            Login
          </Button>{" "}
          <div
            style={{
              justifyContent: "center",
              marginLeft: media ? "1rem" : "7rem",
              marginTop: "2rem",
            }}
          >
            {props.name}
          </div>
          <Link to={"/signup"}>
            <Button
              sx={{
                mt: 2,
                borderRadius: 10,
                marginLeft: media ? "-7rem" : "null",
              }}
              fullWidth
            >
              signup
            </Button>
          </Link>
        </Box>
      </form>
      <ToastContainer />
    </Dialog>
  );
};

export default Login;
