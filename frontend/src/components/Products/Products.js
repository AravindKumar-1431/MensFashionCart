import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../Cart/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
const Products = () => {
  const mediaq = useMediaQuery("(max-width:400px)");
  const [token] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const { addToCart, addtoWishlist } = useCart();

  const [data, setdata] = useState([]);
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getproducts`);
      setdata(response.data);
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const handleAddToCart = async (product) => {
    await addToCart(product.name, product.price, product.image);

    toast.success("Item added successfully to the cart!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleToWishlist = async (product) => {
    await addtoWishlist(product.name, product.price, product.image);

    toast.success("Item added successfully to the wishlist!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box marginTop={"5rem"}>
      <Navbar onSearchChange={handleSearchChange} />
      <Box>
        <center>
          {mediaq ? <h3>keep shoping...</h3> : <h1>keep shoping...</h1>}
        </center>
        <Box
          display={"grid"}
          gridTemplateColumns={mediaq ? "repeat(2, 1fr)" : "repeat(4, 1fr)"}
        >
          {filteredData.map((shirt) => (
            <div key={shirt.id}>
              <Card
                sx={{
                  width: mediaq ? "90%" : "70%",
                  margin: "1rem 1rem",
                  padding: "1rem",
                  height: mediaq ? "52vh" : "60vh",
                }}
              >
                <Box width={"80%"} height={mediaq ? "25vh" : "40vh"}>
                  <Button onClick={() => handleToWishlist(shirt)}>
                    <FavoriteBorderIcon />
                  </Button>
                  <CardMedia
                    sx={{
                      margin: "1rem 1rem",
                      padding: "1rem",
                      width: mediaq ? "80%" : "85%",
                      height: mediaq ? "20vh" : " 31vh",
                    }}
                    image={shirt.image}
                  />
                </Box>

                <CardContent
                  sx={{
                    width: mediaq ? "75%" : "null",
                    height: mediaq ? "30vh" : "null",
                  }}
                >
                  <Typography
                    sx={{
                      marginTop: mediaq ? "2rem" : "1rem",
                      marginBottom: mediaq ? "2rem" : "1rem",
                      fontWeight: "bold",
                      fontSize: mediaq ? "13px" : " null",
                      marginLeft: mediaq ? "2rem" : "",
                      width: mediaq ? "90%" : "null",
                    }}
                  >
                    {shirt.name}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: mediaq ? "2rem" : "5rem",
                      fontWeight: "800",
                      fontSize: mediaq ? "17px" : " null",
                    }}
                  >
                    $ {shirt.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "center",
                    marginTop: mediaq ? "-2rem" : "",
                  }}
                >
                  <button
                    border={"2px solid red"}
                    borderRadius={"20px"}
                    margin={"1rem 1rem"}
                    size="small"
                    style={{
                      width: mediaq ? "70%" : "null",
                      height: mediaq ? "3vh" : "null",
                      fontSize: mediaq ? "17px" : "null",
                      marginTop: mediaq ? "-5rem" : "null",
                    }}
                    onClick={() => handleAddToCart(shirt)}
                  >
                    Add to cart
                  </button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Products;
