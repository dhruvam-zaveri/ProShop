import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import Rating from "../Components/Rating.js";
import { listProductDetails } from "../actions/productActions.js";
import Message from "../Components/Message.js";
import Loader from "../Components/Loader.js";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:{" "}
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                  <Col>Quantity:</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Product Description: {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn btn-dark"
                  disabled={product.countInStock === 0}
                  block
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
      <Link className="btn btn-lg" to="/">
        Go Back
      </Link>
    </>
  );
};

/* if the current 1 row 2 column layout does not look good then switch to 1 row 3 column layout. Refer: folder 2 video 6 */

export default ProductScreen;
