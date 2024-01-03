import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
//import { toast, ToastContainer } from "react-toastify";
const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [wishlist, setwishlist] = useState([]);
  const [order, setorder] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const getcart = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getcart`, {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        });
        console.log(setCart(res.data));
        setCart(res.data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    getcart();
  }, []);
  const addToCart = async (name, price, image) => {
    try {
      const response = await axios.post(
        `${apiUrl}/addtocart`,
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );
      setCart((prevCart) => [...prevCart, response.data.data]);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addtoWishlist = async (name, price, image) => {
    try {
      const response = await axios.post(
        `${apiUrl}/addtowishlist`,
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );
      setwishlist((prevCart) => [...prevCart, response.data.data]);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  useEffect(() => {
    const getwishlist = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getwishlist`, {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        });
        console.log(setwishlist(res.data));
        setwishlist(res.data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    getwishlist();
  }, []);
  //removecart front code
  // const removeFromCart = (shirt) => {
  //   const index = cart.findIndex((item) => item.id === shirt.id);
  //   if (index !== -1) {
  //     const updatedCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
  //     setCart(updatedCart);
  //   }
  // };

  // const addtoWishlist = (product) => {
  //   setWishlist((prevWishlist) => [...prevWishlist, product]);
  // };

  // const removefromWishlist = (product) => {
  //   setwishlist((prevWishlist) => {
  //     const update = prevWishlist.filter((item) => item.id !== product.id);
  //     return update;
  //   });
  // };
  const addtoMyorders = async (name, price, image) => {
    try {
      const response = await axios.post(
        `${apiUrl}/addtoorders`,
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        }
      );
      setorder((prevCart) => [...prevCart, response.data.data]);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  useEffect(() => {
    const getorders = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getorders`, {
          headers: {
            "Content-Type": "application/json",
            "y-token": localStorage.getItem("token"),
          },
        });
        console.log(setwishlist(res.data));
        setorder(res.data);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    getorders();
  }, []);
  // const addtoMyorders = (product) => {
  //   setorder((prevWishlist) => [...prevWishlist, product]);
  // };
  // const Cancelorder = (product) => {
  //   setorder((prevorder) => prevorder.filter((item) => item.id !== product.id));
  // };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        wishlist,
        addtoWishlist,
        setwishlist,
        addtoMyorders,
        order,
        setorder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
