import React from "react";
import Navbar from "../Navbar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
const Homepage = () => {
  const media = useMediaQuery("(max-width:400px)");
  const Shirts = [
    {
      id: 1,
      name: "Blue check shirt",
      Image:
        "https://assets.ajio.com/medias/sys_master/root/20230906/vVWa/64f80929afa4cf41f5b34d62/-473Wx593H-461119105-blue-MODEL.jpg",
      Button: "Shop Now",
    },
    {
      id: 2,
      name: "Black check shirt",
      Image:
        "https://assets.myntassets.com/h_1440,q_100,w_1080 /v1/assets/images/2164373/2017/11/15/11510749192975-Roadster-Men-Brown--Black-Regular-Fit-Checked-Casual-Shirt-8071510749192783-1.jpg",
      Button: "Shop Now",
    },
    {
      id: 3,
      name: "gray formal shirt",
      Image:
        "https://rukminim1.flixcart.com/image/300/300/xif0q/shirt/c/j/z/m-usshto2270-u-s-polo-assn-original-imags3dzykkhzseq.jpeg",
      Button: "Shop Now",
    },
    {
      id: 4,
      name: "White formal shirt",
      Image:
        "https://thehouseofrare.com/cdn/shop/products/IMG_0035_578e1fbd-833d-49c3-b79a-a2132b40168b.jpg?v=1675424320",
      Button: "Shop Now",
    },
  ];
  return (
    <div>
      <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={20}>
        <Box>
          <Navbar />
        </Box>

        <Box
          margin={"auto"}
          width={"80%"}
          height={"70vh"}
          padding={"2"}
          sx={{
            "@media  (max-width: 600px)": {
              width: "85%",

              height: "30vh",
            },
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/662/994/original/vector-colorful-fashion-sale-banner.jpg"
            alt="shopimg"
            width={"100%"}
            height={"100%"}
          />
        </Box>
        <Box margin={"1rem 1rem"} marginLeft={"40%"} justifyContent={"center"}>
          <Link to={"/products"}>
            {" "}
            <button>Shop Now</button>
          </Link>
        </Box>
        <Box
          display={"grid"}
          gridTemplateColumns={media ? "repeat(2,1fr)" : "repeat(4,1fr)"}
        >
          {Shirts.map((shirt) => (
            <Card
              sx={{
                width: "75%",
                height: media ? "45vh" : "75vh",
                margin: "1rem",
                padding: "1rem",
              }}
              key={shirt.id}
            >
              <Box>
                <CardMedia
                  sx={{
                    margin: "1rem 1rem",
                    padding: "1rem",
                    width: media ? "50%" : "100%",
                    height: media ? "15vh" : "50vh",
                  }}
                  image={`${shirt.Image}`}
                />
              </Box>
              <CardContent>
                <Typography sx={{ fontSize: media ? "17px" : "10px" }}>
                  {" "}
                  {`${shirt.name}`}
                </Typography>
              </CardContent>
              <Link to={"/products"} style={{ textDecoration: "none" }}>
                <CardActions sx={{ justifyContent: "center" }}>
                  <button
                    style={{
                      width: media ? "90%" : "null",
                      height: media ? "3vh" : "null",
                      fontSize: media ? "17px" : "null",
                    }}
                  >{`${shirt.Button}`}</button>
                </CardActions>
              </Link>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
