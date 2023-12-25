import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";

import { BASE_URL} from "../../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../../utils/toastUtils";

const fetchFeaturedTours = async () => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/Place/getAllPlaces`,
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
      {featuredTours?.map((tour) => (
        <Col lg="3" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
      <ToastContainer />
    </>
  );
};

export default FeaturedTourList;
