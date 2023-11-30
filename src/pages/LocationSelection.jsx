import React, { useContext, useEffect, useRef, useState } from "react";
import CommonSection from "../shared/CommonSection";
import { Container } from "reactstrap";
import { BASE_URL, STRAPI_URL } from "../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import * as d3 from "d3";
import { AuthContext } from "../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { ToastContainer } from "react-toastify";
import "../styles/locationSelection.css";
import img from "../assets/images/lord-buddha.jpg";

const fetchAllLocations = async () => {
  const res = await axios({
    method: "get",
    url: `${STRAPI_URL}/api/locations/?populate=*`,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
    },
  });
  return res.data;
};

function LocationSelection() {
  const { data: locations, isLoading: isLoading, error: error } = useQuery(
    [`getAllLocations`],
    () => fetchAllLocations(),
    {
      onError: (err) => {
        showErrorToast(err.message);
      },
    }
  );

  console.log(locations)

  return (
    <>
      <CommonSection title={"Choose City"} />
      <section>
        <Container>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="grid-container">
                {[...Array(12).keys()].map((index) => (
                  <div key={index} className="grid-item">
                    <img src={img} alt="img"></img>
                    <h2 className="title">Colombo</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
        <ToastContainer />
      </section>
    </>
  );
}

export default LocationSelection;
