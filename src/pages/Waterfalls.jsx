import React, { useState } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
import { STRAPI_URL } from "../utils/config";
import WaterfallCard from "../shared/WaterfallCard";
import { useQuery } from "react-query";
import { showErrorToast } from "../utils/toastUtils";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const fetchWaterfalls = async (page) => {
  const res = await axios({
    method: "get",
    url: `${STRAPI_URL}/api/waterfalls?populate=*&pagination[pageSize]=8&pagination[page]=${page}`,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
    },
  });
  return res.data;
};

function Waterfalls() {
  const [page, setPage] = useState(1);

  const { data: Waterfalls, isLoading, error } = useQuery(
    [`waterfallsPage${page}`],
    () => fetchWaterfalls(page),
    {
      onError: (err) => {
        showErrorToast(err.message);
        console.error("Error fetching data:", err);
      },
    }
  );

  const pageCount = Waterfalls?.meta.pagination.pageCount;

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
            {Waterfalls?.data.map((tour) => (
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
      <ToastContainer/>
      <Newsletter />
    </>
  );
}

export default Waterfalls;
