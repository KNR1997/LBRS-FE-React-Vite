import React, { useRef, useState } from "react";
import "../styles/tour-details.css";
import { Col, Container, ListGroup, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { STRAPI_URL } from "../utils/config";
import { ToastContainer } from "react-toastify";
import { getPlaceData } from "../hooks/useFetch";

function WaterfallDetails() {
  const { placeId } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  const { data: waterfall, isLoading, error } = getPlaceData('waterfalls',placeId);

  // console.log(tour);
  // static data need to connect API
  // const tour = tourData.find((tour) => tour.id === id);


  // const { totalRating, avgRating } = calculateAvgRating(reviews);

  // const options = { day: "numeric", month: "long", year: "numeric" };

  // // submit request to the server
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const reviewText = reviewMsgRef.current.value;

  //   // later call api

  // };

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
            <img src={`${STRAPI_URL}${waterfall?.data.attributes.cover.data.attributes.url}`} alt="tour-img" />

              <div className="tour__info">
                <h2>{waterfall?.data.attributes?.title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items center gap-1">
                    <i
                      className="ri-star-fill"
                      style={{ color: "var(--secondary-color)" }}
                    ></i>
                    {waterfall?.data.attributes?.avgRating === 0 ? null : waterfall?.data.attributes?.avgRating}
                    {/* {totalRating === 0 ? (
                      "Not rated"
                    ) : (
                      <span>({reviews.length})</span>
                    )} */}
                    {/* <span>({reviews.length})</span> */}
                  </span>
                  <span>
                    <i className="ri-map-pin-user-fill"></i> {waterfall?.data.attributes?.address}
                  </span>
                </div>

                <div className="tour__extra-details">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {waterfall?.data.attributes?.city}
                  </span>
                  {/* <span>
                    <i className="ri-money-dollar-circle-line"></i> ${price}
                    /per person
                  </span> */}
                  <span>
                    <i className="ri-map-pin-time-line"></i> {waterfall?.data.attributes?.distance} k/m
                  </span>
                  {/* <span>
                    <i className="ri-group-line"></i> {maxGroupSize} people
                  </span> */}
                </div>
                <h5>Description</h5>
                <p>{waterfall?.data.attributes?.desc}</p>
              </div>

              {/* =============== tour reviews section */}
              {/* <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <form onSubmit={submitHandler}>
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span onClick={() => setTourRating(1)}>
                      1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(2)}>
                      2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(3)}>
                      3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(4)}>
                      4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={() => setTourRating(5)}>
                      5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>

                  <div className="review__input">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="share your thoughts"
                      required
                    />
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
                                "en-US",
                                options
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
              </div> */}
            </div>
          </Col>

          <Col lg='4'>
            <Booking tour={waterfall} avgRating={waterfall?.data.attributes.avgRating}/>
          </Col>
        </Row>
      </Container>
    </section>
    <ToastContainer/>
    <Newsletter/>
    </>
  );
}

export default WaterfallDetails;
