import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartAction.js";
import CheckoutSteps from "../Components/CheckoutSteps.js";
import Meta from "../Components/Meta.js";

export const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    history.push("/placeorder");
  };

  return (
    <Container>
      <Meta title="ProShop | Order | Payment" />
      <Row className="justify-content-md-center">
        <Col md={6} xs={12}>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Payment Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  label="PayPal or Credit Card"
                  id="Paypal"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  label="Stripe"
                  id="Stripe"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Form.Check
                  type="radio"
                  name="paymentMethod"
                  label="COD (Cash On Delivery)"
                  id="COD"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
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

export default PaymentScreen;
