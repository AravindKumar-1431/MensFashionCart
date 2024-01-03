import React from "react";
import Navbar from "./components/Navbar";
import { useCart } from "./components/Cart/CartContext";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
const Myorders = () => {
  const media = useMediaQuery("(max-width:400px)");
  const { order, setorder } = useCart();
  const apiUrl = process.env.REACT_APP_API_URL;
  const removefromorders = async (shirt) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/removefromorders/${shirt._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200) {
        setorder((prevCart) =>
          prevCart.filter((item) => item._id !== shirt._id)
        );
        toast.success("Item removed successfully from the cart!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(
          `Failed to remove item from the cart. Status: ${res.status}`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      toast.error(
        `Failed to remove item from the cart. Error: ${error.message}`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
  };
  const handleRemoveorders = (shirt) => {
    removefromorders(shirt);
  };

  const cartItems = order || [];
  return (
    <Box>
      <Box margin={"5rem"}>
        <Navbar />
      </Box>
      <center>
        <h2
          style={{
            margin: "3rem",
            // marginLeft: media ? "10rem" : "45rem",
            fontSize: "3rem",
          }}
        >
          {" "}
          my orders
        </h2>
      </center>
      {cartItems.length === 0 ? (
        <p style={{ marginLeft: media ? "8rem" : "40rem", fontSize: "3rem" }}>
          Your Orders are empty
        </p>
      ) : (
        <Box border={"2px solid black"} borderRadius={"10px"}>
          <Box>
            <Navbar />
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={media ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
          >
            {cartItems.map((shirt) => (
              <Card
                sx={{
                  width: media ? "90%" : "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: media ? "60vh" : "60vh",
                }}
                key={shirt.id}
              >
                <Box
                  width={media ? "90%" : "80%"}
                  height={media ? "20vh" : "33vh"}
                >
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: media ? "90%" : "85%",
                      height: media ? "20vh" : " 31vh",
                    }}
                    image={`${shirt.image}`}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: media ? "75%" : "null",
                    height: media ? "12vh" : "null",
                    marginBottom: media ? "8rem" : "null",
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: media ? "2rem" : "null",
                      marginBottom: media ? "2rem" : "1rem",
                      fontWeight: "bold",
                      fontSize: media ? "14px" : " null",
                    }}
                  >{`${shirt.name}`}</Typography>
                  <Typography
                    sx={{
                      marginLeft: media ? "2rem" : "4rem",
                      fontWeight: "800",
                      fontSize: media ? "20px" : " null",
                    }}
                  >
                    $ {`${shirt.price}`}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: media ? "flex" : "null",
                    flexDirection: media ? "column" : "",
                  }}
                >
                  <CardActions
                    sx={{
                      justifyContent: "center",
                      gap: "2rem",
                    }}
                  >
                    <button
                      style={{
                        width: media ? "90%" : "50%",
                        height: media ? "6vh" : "4vh",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: media ? "-1rem" : "-2rem",
                        fontSize: media ? "13px" : "11px",
                        fontWeight: media ? "null" : "bold",
                        marginTop: media ? "-5rem" : "2rem",
                      }}
                      onClick={() => handleRemoveorders(shirt)}
                    >
                      Cancel Order
                    </button>
                    <Link to={"/Payment"}></Link>
                  </CardActions>
                </Box>
              </Card>
            ))}
          </Box>
          <ToastContainer />
        </Box>
      )}
    </Box>
  );
};

export default Myorders;
