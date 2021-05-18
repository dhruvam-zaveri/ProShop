// Now we will add product as global level state.
// There are 2 types of states component level state and global/application level state.
// For the time being we are adding products at component level state but it should be added at application level state,
// this will be done when we will be using redux.
// Component level state consists of info about the state of the component e.g. open and close state for a menu component.
// Things like products, users, my cart and etc should be in application level state.

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product.js";
import { listProducts } from "../actions/productActions.js";
import Message from "../Components/Message.js";
import Loader from "../Components/Loader.js";
import CarouselSlider from "../Components/CarouselSlider.js";

// useState hook is used to use state in functional components, because in class based components we would define our state in
// constructor but with functions we don't have constructor, so we will be using this hook.

// useEffect hook is used to get data from the backend.
// useEffect hook takes an arrow function as an argument and this function will be ran as soon asthe component is loaded. We can
// chek this by console.log()
// useEffect hook takes 2 argument: a callback function and a list of dependencies in [] brackets. Whenever the a change occures
// in dependecies the callback method is fired e.g. [test] is passed then whenever the value of test is changed callback method
// will be fired

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  // useDispatch is used to fire actions
  // To use useDispatch hook we need to declare a variable calles dispatch and set it
  const dispatch = useDispatch();

  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, error, products } = productList;
  // To use useState hook we will use following syntax:

  // const [products, setProducts] = useState([]);

  // The [] brackets consists of 2 things: what we want to call this piece of state and what we want to call the function we
  // will be using to manipulate the state.
  // We can also set default value for this state in the parenthesis of useState by passing values in [] brackets.
  // Here we have passed empty [] brackets meaning no default values.

  useEffect(() => {
    // We want out products as soon as the component loads, so we will be using axios to fire a get request.
    // Now axios returns a promise, we can handle it by adding .then() method  in the get request and passing response in it
    // axios.get("/api/products").then(res);

    // or by using async await, which we will be using here, it will return a promise so we will need to use await, but to do
    // that we need to make the arrow function async but we can't do that. So we will have to create a seperate funtion inside
    // useEffect which will be async.

    // const fetchProducts = async () => {
    // the await axios.get("/api/products") will return an object but we only need the data part from it so we are destructuring it

    // const { data } = await axios.get("/api/products");

    // Now we need to set the products to this data, we will be doing that by using the setProducts() because that's what we
    // have defined earlier.

    // setProducts(data);

    // This function is now all set, we only need to call it from useEffect.
    // };
    // fetchProducts();

    // After doing all this we are still not able to see products on home screen, this is beacuse the porducts are on locahost:5000
    // and the proshop website is running on localhost:30001173

    // A naive approach to this would be specifying localhost:5000 in axios.get() method, but that would create an across domain error.
    // So to avoid that we need to add a proxy that would instead of looking at localhost: 3000 will look at localhost: 5000.

    // We can do this by going into frontend/package.json and adding "proxy":"http://127.0.0.1:5000" right under the "name"

    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <CarouselSlider className="py-3" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
