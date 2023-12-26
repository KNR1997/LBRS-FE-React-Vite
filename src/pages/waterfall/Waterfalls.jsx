import React, { useState } from "react";
import CommonSection from "../../shared/CommonSection";
import "../../styles/tour.css";
import SearchBar from "../../shared/SearchBar";
import Newsletter from "../../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import WaterfallCard from "../../shared/WaterfallCard";
import { ToastContainer } from "react-toastify";
import { getCategoryPlaces } from "../../hooks/react.query";

function Waterfalls() {
  const [page, setPage] = useState(0);
  const { data: Waterfalls, isLoading, error } = getCategoryPlaces(
    "Waterfall",
    page
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const pageCount = Waterfalls?.totalPages;

  const renderPaginationDots = () => {
    if (!pageCount || pageCount <= 1) {
      return null; // Don't render pagination dots if there's only one page or no data
    }

    return Array.from({ length: pageCount }, (_, index) => (
      <span
        key={index}
        className={page === index ? "active__page" : ""}
        onClick={() => setPage(index)}
      >
        {index + 1}
      </span>
    ));
  };

  return (
    <>
      <CommonSection title={"All Waterfalls"} />
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
            {Waterfalls?.content.map((tour) => (
              <Col lg="3" className="mb-4" key={tour.id}>
                <WaterfallCard tour={tour} />
              </Col>
            ))}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {renderPaginationDots()}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer />
      <Newsletter />
    </>
  );
}

export default Waterfalls;
