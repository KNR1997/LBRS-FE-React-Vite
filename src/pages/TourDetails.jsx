import React from "react";
import "../styles/tour-details.css";
import { Col, Container, ListGroup, Row } from "reactstrap";
import tourData from "../assets/data/tours";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";

function TourDetails() {
  const { id } = useParams();

  // static data need to connect API
  const tour = tourData.find((tour) => tour.id === id);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt="" />

              <div className="tour__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>{" "}
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews.length})</span>
                    )}
                    <span>({reviews.length})</span>
                  </span>
                  <span>
                    <i className="ri-map-pin-user-fill"></i> {address}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                    /per person
                  </span>
                  <span>
                    <i className="ri-group-line"></i> {maxGroupSize}
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              {/* =============== tour reviews section */}
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <form>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span>
                      1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>

                  <div className="review__input">
                    <input type="text" placeholder="share your thoughts" />
                    <button
                      className="btn primary__btn text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <ListGroup className="user__reviews">
                  {reviews?.map((review) => (
                    <div className="review__item">
                      <img src={avatar} alt="" />

                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>Kethaka</h5>
                            <p>
                              {new Date("01-11-2023").toLocaleDateString(
                                "en-US", options
                              )}
                            </p>
                          </div>
                          <span className="d-flex align-items-center">
                            5<i className="ri-star-s-fill"></i>
                          </span>
                        </div>

                        <h6>Amazing Tour</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default TourDetails;
