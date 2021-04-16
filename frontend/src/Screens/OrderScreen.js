import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions.js";
import Message from "../Components/Message.js";
import Loader from "../Components/Loader.js";

export const PlaceOrderScreen = ({ history, match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  // cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  // cart.totalPrice = (
  //   Number(cart.itemsPrice) +
  //   Number(cart.shippingPrice) +
  //   Number(cart.taxPrice)
  // ).toFixed(2);

  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(orderId));
    }
    //eslint - disable - next - line
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>
        <strong>Order #{order._id}</strong>
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>EMail: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}
                {","}
                <br />
                {order.shippingAddress.city}
                {", "}
                {order.shippingAddress.state}
                {", "}
                {order.shippingAddress.country}
                {"."}
                <br />
                {order.shippingAddress.postalCode}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Details</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod === undefined
                  ? history.push("/payment")
                  : order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && <Message variant="danger">{error}</Message>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
