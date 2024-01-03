import CommonSection from "../shared/CommonSection";
import { Container } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import { showErrorToast } from "../utils/toastUtils";
import { ToastContainer } from "react-toastify";
import "../styles/locationSelection.css";
import { useState } from "react";

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

  const [location, setLocation] = useState();

  const handleClick = (location) => {
    setLocation(location);
  }

  console.log(location);

  return (
    <>
      <CommonSection title={"Choose City"} />
      <section>
        <Container>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="grid-container">
                {locations?.map((location, index) => (
                  <div key={index} className="grid-item" onClick={()=> handleClick(location)}>
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
