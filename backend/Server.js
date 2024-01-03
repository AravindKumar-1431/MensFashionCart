const express = require("express");
const mongoose = require("mongoose");
const usersignup = require("./models/usersignup");
const Products = require("./models/products");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const jwtmiddleware = require("./middleware");
const products = require("./models/products");
const addcart = require("./models/addcart");
const addwishlist = require("./models/addwishlist");
const addorders = require("./models/myorders");
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://aravindpatel549:0dtdZ7gO91HNsMCJ@cluster0fashioncart.mzf430z.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected"));

app.get("/", (req, res) => {
  return res.send("helloworld");
});

app.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, confrimpassword } = req.body;
    const exist = await usersignup.findOne({ email });
    if (exist) {
      return res.status(400).send("user already exist");
    }
    if (password != confrimpassword) {
      return res.status(403).send("password not matched");
    }
    let newuser = new usersignup({
      fullname,
      email,
      password,
      confrimpassword,
    });
    newuser.save();
    return res.status(200).send("user registered successfully");
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await usersignup.findOne({ email });
    if (!exist) {
      return res.status(400).send("user not found");
    }
    if (exist.password != password) {
      return res.status(403).send("enter vaild password");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 36000000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token: token });
    });
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});

app.get("/allusers", jwtmiddleware, async (req, res) => {
  try {
    let allusers = await usersignup.find();
    return res.json(allusers);
  } catch (err) {
    console.log(err);
    return res.status(404).send("server error");
  }
});

app.get("/myprofile", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    let userProfile = await usersignup.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(userProfile);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//Product code
app.post("/addproduct", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "Name, price, and image are required." });
    }

    const product = new Products({
      name,
      price,
      image,
    });
    await product.save();

    return res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    let allproducts = await products.find();
    console.log(req.user);
    return res.json(allproducts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtocart", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, price, image } = req.body;

    const cartItem = {
      userId: userId,
      name: name,
      price: price,
      image: image,
    };

    const cartData = await addcart.create(cartItem);

    return res.status(200).send({ data: cartData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getcart", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    let getcart = await addcart.find({ userId: userId });

    return res.json(getcart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/removefromcart/:itemId", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    console.log(itemId);

    const removedCartItem = await addcart.findOneAndDelete({
      _id: itemId,
      userId: userId,
    });

    if (removedCartItem) {
      return res
        .status(200)
        .json({ message: "Cart item removed successfully" });
    } else {
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtowishlist", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, price, image } = req.body;

    const cartItem = {
      userId: userId,
      name: name,
      price: price,
      image: image,
    };

    const cartData = await addwishlist.create(cartItem);

    return res.status(200).send({ data: cartData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getwishlist", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    let getcart = await addwishlist.find({ userId: userId });

    return res.json(getcart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/removefromwishlist/:itemId", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    console.log(itemId);

    const removedCartItem = await addwishlist.findOneAndDelete({
      _id: itemId,
      userId: userId,
    });

    if (removedCartItem) {
      return res
        .status(200)
        .json({ message: "wishlist item removed successfully" });
    } else {
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtoorders", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, price, image } = req.body;

    const cartItem = {
      userId: userId,
      name: name,
      price: price,
      image: image,
    };

    const cartData = await addorders.create(cartItem);

    return res.status(200).send({ data: cartData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getorders", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    let getcart = await addorders.find({ userId: userId });

    return res.json(getcart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/removefromorders/:itemId", jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;
    console.log(itemId);

    const removedCartItem = await addorders.findOneAndDelete({
      _id: itemId,
      userId: userId,
    });

    if (removedCartItem) {
      return res
        .status(200)
        .json({ message: "wishlist item removed successfully" });
    } else {
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
