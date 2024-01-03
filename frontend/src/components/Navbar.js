import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  IconButton,
  Input,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Navbar = ({ hideSearch, onSearchChange, islogin }) => {
  useEffect(() => {}, [islogin]);
  const showMenuIcon = useMediaQuery("(max-width:400px)");
  const [showTabs, setShowTabs] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [value, setValue] = useState(0); // Add state for the Tabs value

  const handleMenuClick = () => {
    setShowTabs(!showTabs);
    setShowCloseIcon(!showCloseIcon);
  };

  const token = localStorage.getItem("token");

  return (
    <Box>
      <AppBar color={"inherit"}>
        <Toolbar sx={{ height: showMenuIcon ? "5vh" : "" }}>
          <h2>FashionCart</h2>
          {!hideSearch && (
            <Box
              sx={{
                width: showMenuIcon ? "45%" : "35%",
                marginLeft: showMenuIcon ? "3rem" : "10rem",
                paddingLeft: "0.5rem",
              }}
            >
              <Link to={"/products"}>
                <Box
                // sx={{
                //   marginBottom: showMenuIcon ? "-10rem" : "null",
                //   marginLeft: showMenuIcon ? "-40rem" : "null",
                // }}
                >
                  <Input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </Box>
              </Link>
              <Box
                marginTop={"-1.5rem"}
                marginLeft={showMenuIcon ? "-1.5rem" : "7rem"}
              >
                <SearchIcon
                  sx={{
                    width: showMenuIcon ? "15%" : "35%",
                  }}
                />
              </Box>
            </Box>
          )}

          <Box
            width={"10%"}
            margin={"auto"}
            marginLeft={showMenuIcon ? "2rem" : "null"}
          >
            {showMenuIcon && (
              <IconButton onClick={handleMenuClick}>
                {showCloseIcon ? (
                  <CloseIcon
                    sx={{
                      marginLeft: showMenuIcon ? "-25rem" : "null",
                      marginTop: showMenuIcon ? "4rem" : "null",
                    }}
                  />
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            )}
          </Box>

          <Box
            display={!showMenuIcon || showTabs ? "block" : "none"}
            alignItems="center"
            justifyContent="center"
            marginLeft={showMenuIcon ? "-20rem" : "null"}
            marginTop={showMenuIcon ? "11rem" : "null"}
            boxShadow={showMenuIcon ? "2px 2px 2px" : "null"}
            bgcolor={"white"}
          >
            <Tabs
              orientation={showMenuIcon ? "vertical" : "horizontal"}
              value={value} // Set the value prop
              onChange={(event, newValue) => setValue(newValue)} // Handle change
            >
              <Link to={"/"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="Home"
                />
              </Link>
              <Link to={"/products"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="Products"
                />
              </Link>
              {token ? (
                <Link to={"/Cart"}>
                  <IconButton>
                    <ShoppingCartIcon />
                  </IconButton>
                </Link>
              ) : (
                <Link to={"/login"}></Link>
              )}
              <Link to={"/wishlist"}>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Link>
              <Link to={"/myorders"}>
                <Tab
                  sx={{
                    color: "black",
                  }}
                  label="My orders"
                />
              </Link>

              {token ? (
                <Link to="/userprofile">
                  <IconButton>
                    <PersonIcon />
                  </IconButton>
                </Link>
              ) : (
                <Link to="/login">
                  <Tab
                    sx={{
                      color: "black",
                    }}
                    label="Login"
                  />
                </Link>
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
