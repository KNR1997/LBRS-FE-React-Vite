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
import { fetchAsyncSubCategories, getAllSubCategories } from "../store/subCategorySlice";
import { useSelector } from "react-redux";
import { setUserRecord, getUserRecord, setLikeSubCategories } from "../store/userRecordSlice";

const fetchAllLocations = async () => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/location/getAllLocations`,
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
  const allSubCategories = useSelector(getAllSubCategories);
  const userRecord = useSelector(getUserRecord);

  console.log('userRecord',userRecord);

  return (
    <>
      <CommonSection title={"Choose City"} />
      <section>
        <Container>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="grid-container">
                {locations?.map((location, index) => (
                  <div key={index} className="grid-item">
                    <img src={location.img} alt="img"></img>
                    <h2 className="title">{location.name}</h2>
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
