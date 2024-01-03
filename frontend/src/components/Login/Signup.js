import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useMediaQuery } from "@mui/material";
const labelStyle = { mt: 1, mb: 2 };

const Signup = () => {
  const navigate = useNavigate();
  const crossHandler = () => {
    navigate("/");
  };

  const [singup, setsignup] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password, confrimpassword } = singup;

  function onchangehandle(e) {
    setsignup({ ...singup, [e.target.name]: e.target.value });
  }
  function submitform(e) {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .post(`${apiUrl}/signup`, singup)
      .then((res) => {
        console.log(res.signup);
        toast.success("signup successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          onClose: () => {
            navigate("/login");
          },
        });
      })
      .catch((error) => {
        console.error(error.response.data);

        toast.error("user already existed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
    if (fullname.length <= 5) {
      alert("Please enter atleast more than 8 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter name atleast correct email");
    } else if (password.length <= 8) {
      alert("Please enter password atleast more than 8 characters");
    } else if (password !== confrimpassword) {
      alert("password is not matched");
    } else {
      console.log(singup);
    }
    localStorage.setItem("signupname", singup.fullname);
    localStorage.setItem("signupEmail", singup.email);
    localStorage.setItem("signupPassword", singup.password);
  }
  const media = useMediaQuery("(max-width:400px)");
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 20, marginTop: media ? "10rem" : "6rem" },
      }}
      open={true}
    >
      <Box sx={{ ml: "auto", padding: 1, marginTop: media ? "-1rem" : "3rem" }}>
        <IconButton onClick={crossHandler}>
          <ClearRoundedIcon />
        </IconButton>
      </Box>

      <homepage />

      <Box height={media ? "75vh" : "null"}>
        <Typography variant="h4" textAlign={"center"}>
          {" "}
          Signup
        </Typography>

        <form onSubmit={submitform} style={{}}>
          <Box
            padding={6}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            width={400}
            margin={"auto"}
            alignContent={"center"}
          >
            <FormLabel
              sx={{ labelStyle, marginBottom: media ? "0rem" : "null" }}
            >
              Name
            </FormLabel>
            <TextField
              variant="standard"
              margin="normal"
              type={"name"}
              name="fullname"
              value={fullname}
              onChange={onchangehandle}
              // inputRef={nameRef}
            />
            <FormLabel
              sx={{ labelStyle, marginBottom: media ? "0rem" : "null" }}
            >
              Email
            </FormLabel>
            <TextField
              variant="standard"
              margin="normal"
              type={"email"}
              name="email"
              value={email}
              onChange={onchangehandle}
              // inputRef={emailRef}
            />
            <FormLabel
              sx={{ labelStyle, marginBottom: media ? "0rem" : "null" }}
            >
              Password
            </FormLabel>
            <TextField
              variant="standard"
              margin="normal"
              type={"password"}
              name="password"
              value={password}
              onChange={onchangehandle}
              // inputRef={passwordRef}
            />
            <FormLabel
              sx={{ labelStyle, marginBottom: media ? "0rem" : "null" }}
            >
              Confrim Password
            </FormLabel>
            <TextField
              variant="standard"
              margin="normal"
              type={"password"}
              name="confrimpassword"
              value={confrimpassword}
              onChange={onchangehandle}

              // inputRef={passwordRef}
            />
            {password !== confrimpassword && (
              <div style={{ color: "red", fontSize: media ? "10px" : "null" }}>
                Passwords do not match
              </div>
            )}
            <Button
              sx={{
                mt: 2,
                borderRadius: 10,
                bgcolor: "#2b2d42",
                width: media ? "30%" : "null",
                marginLeft: media ? "2rem" : "null",
              }}
              // onClick={handleChange}
              type="submit"
              fullWidth
              variant="contained"
            >
              {" "}
              Signup
            </Button>
            <Link to={"/login"}>
              <Button
                sx={{
                  mt: 2,
                  borderRadius: 10,
                  width: media ? "30%" : "null",
                  marginLeft: media ? "1.5rem" : "null",
                  fontSize: media ? "10px" : "null",
                }}
                fullWidth
              >
                Switch to login
              </Button>
            </Link>
          </Box>
        </form>
        <ToastContainer />
      </Box>
    </Dialog>
  );
};

export default Signup;
