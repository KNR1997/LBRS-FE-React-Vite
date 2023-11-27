import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/tour-card.css";
import calculateAvgRating from "../utils/avgRating";
import { STRAPI_URL } from "../utils/config";

function TourCard({ tour }) {
  // const { id, title, city, photo, price, featured, reviews } = tour;
  const { id, attributes } = tour;
  // const { totalRating, avgRating } = calculateAvgRating(reviews);
  
  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={`${STRAPI_URL}${attributes.cover.data.attributes.url}`} alt="tour-img" />
          {attributes.featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items center justify-content-between">
            <span className="tour__location d-flex align-items center gap-1">
              <i className="ri-map-pin-line"></i> {attributes.city}
            </span>
            <span className="tour__rating d-flex align-items center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {attributes.avgRating === 0 ? null : attributes.avgRating}
              {/* {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({reviews.length})</span>
              )} */}
              {/* <span>({reviews.length})</span> */}
            </span>
            <span className="tour__rating d-flex align-items center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {/* {avgRating === 0 ? null : avgRating} */}
              {/* {totalRating === 0 ? (
                "Not rated"
              ) : (
                <span>({})</span>
              )} */}
              <span>({})</span>
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/beaches/${id}`}>{attributes.title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${} <span>/per person</span>
            </h5>

            <button className="btn booking__btn">
              <Link to={`/tours/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TourCard;
