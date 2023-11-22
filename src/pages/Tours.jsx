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
  const [page, setPage] = useState(4);
  const [data, setData]= useState();
  // const [dataCount, setDataCount] = useState(8);

  // const { data: waterfalls, total, loading, error } = useFetch(
  //   `${STRAPI_URL}/api/beaches?populate=*&pagination[pageSize]=8&pagination[page]=${page + 1}`
  // );

  // console.log('total: ',total)
  // console.log('waterfall: ', waterfalls)
  // const dataCount = pagination == undefined ? 8 : pagination.total;
  // console.log('dataCount: ',dataCount);

  // const updateDataCount = () => {
  //   setDataCount(pagination)
  // }

  // useEffect(() => {
  //   console.log('setPageCount')
  //   const pages = Math.ceil(total / 8);
  //   setPageCount(pages);
  // }, [page, pageCount]);

  const headers = {
    Authorization: "bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
  };

  const url = `${STRAPI_URL}/api/beaches?populate=*`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {headers: headers});
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  console.log('data: ',data);

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
              {/* <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
}

export default Tours;
