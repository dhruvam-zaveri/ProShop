import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";

const CarouselSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");

      setProducts(data);
    };
    fetchProduct();
  }, []);

  return (
    <Carousel
      className="py-4 justify-content-center"
      md={12}
      xs={12}
      indicators={false}
    >
      {products.map((p) => {
        return (
          <Carousel.Item style={{ height: "70vh", width: "75vw" }}>
            <Image className="d-block w-100" src={p.image} alt={p.name} fluid />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselSlider;
