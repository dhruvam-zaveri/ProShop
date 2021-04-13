import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, ListGroup, Image, Button } from "react-bootstrap";
import Message from "../Components/Message.js";
import { addToCart, removeFromCart } from "../actions/cartAction.js";

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

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.
            <br />
            <Link className="link_cart" to="/">
              Return to Home
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price * item.qty}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h2>
              Subtotal (
              {cartItems.reduce(
                (accumulator, item) => accumulator + item.qty,
                0
              )}
              ) items
            </h2>
            ${" "}
            {cartItems
              .reduce(
                (accumulator, item) => accumulator + item.qty * item.price,
                0
              )
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn btn-block"
              disabled={cartItems.length === 0}
              onClick={() => checkOutHandler()}
            >
              Proceed to checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;
