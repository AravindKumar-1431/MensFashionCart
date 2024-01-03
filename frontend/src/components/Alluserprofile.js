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
  if (!localStorage.getItem("token")) {
    return <redirect to="/login" />;
  }
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
          {data && (
            <div>
              <div key={data._id}>Name: {data.fullname}</div>
              <br />
              <div>Email: {data.email}</div>
              <br />
              {/* Add more fields as needed */}
            </div>
          )}
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
