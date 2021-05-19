import React from "react";
import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to ProShop",
  description: "We sell the best products for cheapest proce available",
  keyword: "electorincs, buy electronics, cheap electronics",
};

export default Meta;
