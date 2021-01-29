import React from "react";
import { Carousel, Image } from "react-bootstrap";
import products from "../products.js";

const CarouselSlider = () => {
  return (
    <Carousel className="py-4" md={12} indicators={false}>
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
