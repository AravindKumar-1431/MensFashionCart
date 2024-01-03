import { Box, margin } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useCart } from "./Cart/CartContext";
import { Divider } from "@mui/material";
import { useMediaQuery } from "@mui/material";
const ProductSummary = () => {
  const media = useMediaQuery("(max-width:400px)");
  const { cart, removeFromCart, addtoMyorders } = useCart();

  const handleRemoveFromCart = (shirt) => {
    removeFromCart(shirt);
    toast.success("Item removed successfully from the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handelconfirmorder = async (product) => {
    await addtoMyorders(product.name, product.price, product.image);
    toast.success("Order Confirmed successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      onClose: () => {
        setTimeout(() => {
          window.location.href = "/myorders";
        }, 100);
      },
    });
  };

  const cartItems = cart || [];

  return (
    <Box>
      <Navbar />

      <Box margin={"5rem"}>
        <h2 style={{ margin: "3rem", fontSize: media ? "30px" : "3rem" }}>
          Orders Summary
        </h2>

        {cartItems.length === 0 ? (
          <p style={{ margin: "3rem", fontSize: "3rem" }}>Your cart is empty</p>
        ) : (
          <Box
            display={"grid"}
            gridTemplateColumns={media ? " repeat(1, 1fr)" : "repeat(2, 1fr)"}
          >
            {cartItems.map((shirt) => (
              <Box key={shirt.id} display="flex" margin="1rem">
                <Card
                  sx={{
                    width: media ? "80%" : "50%",
                    margin: "1rem",
                    padding: "1rem",
                    height: margin ? "45vh" : "60vh",
                    marginLeft: "-4rem",
                  }}
                >
                  <Box width={"80%"} height={"40vh"}>
                    <CardMedia
                      sx={{
                        margin: "1rem",
                        padding: "1rem",
                        width: media ? "80%" : "70%",
                        height: media ? "17vh" : "35vh",
                      }}
                      image={`${shirt.image}`}
                    />
                  </Box>

                  <CardContent sx={{}}>
                    <Typography
                      sx={{
                        marginTop: media ? "-8rem" : "null",
                        marginLeft: media ? "1rem" : "2rem",
                        width: media ? "90%" : "70%",
                        height: media ? "10vh" : "35vh",
                        fontSize: media ? "12px" : "null",
                      }}
                    >{`${shirt.name}`}</Typography>
                    <Typography
                      sx={{
                        marginLeft: media ? "1rem" : "3rem",
                        fontWeight: "800",
                        marginTop: media ? "-1rem" : "null",
                      }}
                    >
                      $ {`${shirt.price}`}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "center" }}>
                    <button
                      style={{
                        width: media ? "90%" : "40%",
                        height: "3vh",
                        marginLeft: media ? "1.5rem" : "",
                        marginTop: media ? "-7rem" : "null",
                        fontSize: media ? "16px" : "null",
                      }}
                      onClick={() => handleRemoveFromCart(shirt)}
                    >
                      Remove
                    </button>
                  </CardActions>
                </Card>

                <Card
                  key={`price-${shirt.id}`}
                  sx={{
                    width: media ? "70%" : "50%",
                    height: media ? "70vh" : "55vh",
                    padding: "1rem",
                    margin: "2rem",
                  }}
                >
                  {media ? (
                    <center>
                      <Box sx={{ fontSize: "20px", fontWeight: "800" }}>
                        {" "}
                        Price Details
                      </Box>

                      <Divider />

                      <Box>
                        <h4>
                          {" "}
                          Discount &nbsp; &nbsp; &nbsp; &nbsp; ${" "}
                          {`${shirt.price}`}
                        </h4>
                        <Divider />
                        <Divider />
                        <h4>
                          {" "}
                          Discount &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 20%{" "}
                        </h4>
                        <Divider />
                        <h4>Delivery Charges &nbsp; &nbsp; &nbsp; Free</h4>
                        <Divider />
                        <h4>
                          &nbsp; &nbsp; &nbsp; &nbsp;Total &nbsp; &nbsp; &nbsp;
                          $ 80
                        </h4>
                        <Divider />
                        <Box padding={"1rem"}>
                          <Link to={"/myorders"}>
                            <button
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(129,127,168,1) 0%, rgba(46,46,98,1) 35%, rgba(2,175,230,1) 88%, rgba(26,105,123,1) 96%, rgba(1,203,249,1) 97%, rgba(0,212,255,1) 100%)",
                                color: "white",
                                fontWeight: "800",
                                cursor: "pointer",
                                marginLeft: media ? "-1rem" : "4.5rem",
                                fontSize: "9px",

                                width: media ? "150%" : "null",
                                height: media ? "4vh" : "null",
                              }}
                              onClick={() => handelconfirmorder(shirt)}
                            >
                              Conform Order
                            </button>
                          </Link>
                        </Box>
                      </Box>
                    </center>
                  ) : (
                    <center>
                      <h1>Price Details</h1>
                      <Divider />

                      <Box>
                        <h4>
                          {" "}
                          Discount &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; $ {`${shirt.price}`}
                        </h4>
                        <Divider />
                        <Divider />
                        <h4>
                          {" "}
                          Discount &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; 20%{" "}
                        </h4>
                        <Divider />
                        <h4>
                          Delivery Charges &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; Free
                        </h4>
                        <Divider />
                        <h4>
                          Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp; &nbsp; $ 80
                        </h4>
                        <Divider />
                        <Box padding={"1rem"}>
                          <Link to={"/myorders"}>
                            <button
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(129,127,168,1) 0%, rgba(46,46,98,1) 35%, rgba(2,175,230,1) 88%, rgba(26,105,123,1) 96%, rgba(1,203,249,1) 97%, rgba(0,212,255,1) 100%)",
                                color: "white",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginLeft: "4.5rem",
                              }}
                              onClick={() => handelconfirmorder(shirt)}
                            >
                              Conform Order
                            </button>
                          </Link>
                        </Box>
                      </Box>
                    </center>
                  )}
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ProductSummary;
