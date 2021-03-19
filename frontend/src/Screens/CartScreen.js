import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Card, Form, ListGroup } from "react-bootstrap";
// import Message from "../Components/Message.js";
import { addToCart } from "../actions/cartAction.js";

export const CartScreen = ({ match, location, history }) => {
  // match is used to access URL parameters using match.params
  // loaction is used to access query params
  // history is used to manage and handle the browser history (redirecting)
  // To know about these 3 props follow:
  // https://medium.com/@mcastorena0316/react-routes-the-wonders-of-match-history-and-location-3c525ba7d48b
  // https://www.freecodecamp.org/news/hitchhikers-guide-to-react-router-v4-4b12e369d10/

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(productId, qty, cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <div>Cart</div>;
};

export default CartScreen;
