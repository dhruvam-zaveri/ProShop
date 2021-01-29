import "./Components/Header.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import CarouselSlider from "./Components/CarouselSlider.js";
import HomeScreen from "./Screens/HomeScreen.js";
import ProductScreen from "./Screens/ProductScreen.js";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <CarouselSlider />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

/* The :id in product page route is placeholder for product._id, it will specify with product is to be rendered on the new page */

export default App;
