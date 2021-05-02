import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../Components/Message.js";
import Loader from "../Components/Loader.js";
import { getUserDetails } from "../actions/userActions.js";

export const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, userId]);

  return (
    <>
      <Link to={"/admin/userList"} className="btn btn-light my-3">
        Go Back
      </Link>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} xs={12}>
            <h1>Edit User</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
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

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="isadmin">
                  <Form.Check
                    type="checkbox"
                    label="Is Admin"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <Button type="submit" varient="primary">
                  Update
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserEditScreen;
