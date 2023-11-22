import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import { STRAPI_URL } from "../utils/config";

function Tours() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();

  const headers = {
    Authorization: "bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
  };

  const url = `${STRAPI_URL}/api/beaches?populate=*&pagination[pageSize]=8&pagination[page]=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  const pageCount = data?.meta.pagination.pageCount;

  const renderPaginationDots = () => {
    if (!pageCount || pageCount <= 1) {
      return null; // Don't render pagination dots if there's only one page or no data
    }

    return Array.from({ length: pageCount }, (_, index) => (
      <span
        key={index}
        className={page === index + 1 ? "active__page" : ""}
        onClick={() => setPage(index + 1)}
      >
        {index + 1}
      </span>
    ));
  };

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
            {data?.data.map((tour) => (
              <Col lg="3" className="mb-4" key={tour.id}>
                <TourCard tour={tour} />
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
      <Newsletter />
    </>
  );
}

export default Tours;
