import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import Message from "../Components/Message.js";
import Loader from "../Components/Loader.js";
import { getUserDetails } from "../actions/userActions.js";

export const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId={name}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId={email}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId={password}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId={confirmPassword}>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" varient="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
