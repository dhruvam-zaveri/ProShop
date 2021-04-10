import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { saveShippingAddress } from "../actions/cartAction.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";

export const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, state, postalCode, country })
    );
    history.push("/payment");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6} xs={12}>
          <CheckoutSteps step1 step2 />
          <h1>Shipping Details</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                onChange={(e) => setState(e.target.value)}
                value={state}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
