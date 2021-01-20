// import logo from './logo.svg';
// import './App.css';
import "./Components/Header.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Welcome to Proshop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
