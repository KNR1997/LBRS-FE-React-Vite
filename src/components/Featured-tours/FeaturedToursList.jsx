import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";

import { STRAPI_URL } from "../../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/toastUtils";

const fetchFeaturedTours = async () => {
  const res = await axios({
    method: "get",
    url: `${STRAPI_URL}/api/beaches?populate=*&filters[featured][$eq]=true`,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
    },
  });
  return res.data;
};

const FeaturedTourList = () => {
  const { data: featuredTours, isLoading, error } = useQuery(
    [`featuredTours`],
    () => fetchFeaturedTours(),
    {
      onError: (err) => {
        showErrorToast(err.message);
        console.error("Error fetching data:", err);
      },
    }
  );

  return (
    <>
      {featuredTours?.data.map((tour) => (
        <Col lg="3" className="mb-4" key={featuredTours.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
      <ToastContainer />
    </>
  );
};

export default FeaturedTourList;
