import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";
import tourData from "../assets/data/tours";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { STRAPI_URL } from "../utils/config";

function Tours() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {data: featuredTours, loading, error } = useFetch(
    `${STRAPI_URL}/api/beaches?populate=*`
  );

  console.log(featuredTours);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
  }, [page]);

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {featuredTours?.map((tour) => (
              <Col lg="3" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
}

export default Tours;
