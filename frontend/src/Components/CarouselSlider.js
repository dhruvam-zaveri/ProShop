import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";

const CarouselSlider = () => {
  const [sale, setSale] = useState([]);

  useEffect(() => {
    const fetchSale = async () => {
      const { data } = await axios.get("/api/sale");

      setSale(data);
    };
    fetchSale();
  }, []);

  return (
    <Carousel className=" justify-content-center" indicators={false}>
      {sale.map((s) => {
        return (
          <Carousel.Item key={s._id}>
            <Image
              className="d-block w-100"
              src={s.image}
              alt={s.name}
              style={{ height: "50vh" }}
              fluid
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselSlider;
