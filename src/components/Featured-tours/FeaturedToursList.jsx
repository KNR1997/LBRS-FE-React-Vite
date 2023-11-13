import React from "react";
import TourCard from "../../shared/TourCard";
import tourData from "../../assets/data/tours";
import { Col } from "reactstrap";

import useFetch from "../../hooks/useFetch";
import { STRAPI_URL } from "../../utils/config";

const FeaturedTourList = () => {

  const {data: featuredTours, loading, error } = useFetch(
    `${STRAPI_URL}/api/beaches?populate=*`
  );

  console.log("featureTours: ",featuredTours);

  return (
    <>
      {featuredTours?.map((tour) => (
        <Col lg="3" className="mb-4" key={featuredTours.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
