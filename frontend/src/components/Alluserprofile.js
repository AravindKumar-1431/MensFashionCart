import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { Link, redirect } from "react-router-dom";

const Alluserprofile = () => {
  const [data, setdata] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [logingoogle, setlogingoogle] = useState(null);
  console.log(logingoogle);

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/login/success`, {
          withCredentials: true,
          headers: { "y-token": localStorage.getItem("token") },
        });
        setlogingoogle(res.data.user);
      } catch (err) {
        console.log("error");
      }
    };
    getuser();
  }, []);
  // if (!localStorage.getItem("token")) {
  //   return <redirect to="/login" />;
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/myprofile`, {
          headers: { "y-token": localStorage.getItem("token") },
        });

        setdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error during GET request:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box marginTop={"5rem"}>
      <center>
        <Box>
          <h1>Your Account</h1>
          <PersonIcon sx={{ height: "20vh", width: "50%" }} />
        </Box>
        <Box
          sx={{
            border: "2px solid white",
            boxShadow: "1px 0px 1px 1px",
            width: "25%",
            fontWeight: "800",
            color: "green",
          }}
        >
          <div>
            <h1>User Profile</h1>
            {logingoogle ? (
              <div>
                <p>Display Name: {logingoogle.displayName}</p>
                <p>Email: {logingoogle.email}</p>

                <img src={logingoogle.image} alt="User Avatar" />
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
          <div>
            <h1>User Profile</h1>
            {data ? (
              <div>
                <p>Display Name: {data.fullname}</p>
                <p>Email: {data.email}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>

          <Link to={"/login"}>
            <Box>
              <IconButton onClick={() => localStorage.removeItem("token")}>
                <p>logout</p> <LogoutIcon />
              </IconButton>
            </Box>
          </Link>
        </Box>
      </center>
    </Box>
  );
};

export default Alluserprofile;
