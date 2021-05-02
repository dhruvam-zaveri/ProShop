import "./Components/Header.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import HomeScreen from "./Screens/HomeScreen.js";
import ProductScreen from "./Screens/ProductScreen.js";
import CartScreen from "./Screens/CartScreen.js";
import LoginScreen from "./Screens/LoginScreen.js";
import RegisterScreen from "./Screens/RegisterScreen.js";
import ProfileScreen from "./Screens/ProfileScreen.js";
import ShippingScreen from "./Screens/ShippingScreen.js";
import PaymentScreen from "./Screens/PaymentScreen.js";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen.js";
import OrderScreen from "./Screens/OrderScreen.js";
import UserListScreen from "./Screens/UserListScreen.js";
import ProductListScreen from "./Screens/ProductListScreen.js";
import UserEditScreen from "./Screens/UserEditScreen.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/cart/:id" component={CartScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/admin/userlist" component={UserListScreen} exact />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
          <Route path="/order/:id" component={OrderScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

/* The :id in product page route is placeholder for product._id, it will specify with product is to be rendered on the new page */

export default App;
