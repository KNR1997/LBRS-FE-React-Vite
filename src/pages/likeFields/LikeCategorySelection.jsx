import React, { useContext, useEffect, useRef, useState } from "react";
import CommonSection from "../../shared/CommonSection";
import { Container } from "reactstrap";
import * as d3 from "d3";
import { AuthContext } from "../../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { ToastContainer } from "react-toastify";
import "../../styles/locationSelection.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserRecord,
  setLikeSubCategories,
} from "../../store/userRecordSlice";
import { getAllSubCategories } from "../../store/subCategorySlice";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

function LikeCategorySelection() {
  const svgRef = useRef(null);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const userRecord = useSelector(getUserRecord);
  const allSubCategories = useSelector(getAllSubCategories);
  const [userLikeSubs, setUserLikeSubs] = useState([]);

  useEffect(() => {
    if (allSubCategories) {
      // Set up D3 bubble chart
      const diameter = 500;
      const height = 1200;
      const width = 1200;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const bubble = d3.pack().size([height, width]).padding(10);

      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

      // Combine children of nodes1 and nodes2
      // const combinedChildren = [...allSubCategories, ...userLikeSubs];
      const combinedChildren = [
        ...allSubCategories.filter(
          (subCategory) =>
            !userLikeSubs.some((userSubCategory) => userSubCategory.id === subCategory.id)
        ),
        ...userLikeSubs,
      ];      

      const nodes = d3.hierarchy({ children: combinedChildren }).sum((d) => 1);

      const node = svg
        .selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter((d) => !d.children)
        .append("g")
        .attr("class", (d) => `node node-${d.data.id}`) // Add a unique class based on data.id
        .attr("transform", (d) => `translate(${d.x},${d.y})`)
        .on("mouseenter", handleNodeMouseEnter)
        .on("mouseleave", handleNodeMouseLeave);

      node
        .append("circle")
        .attr("r", (d) => d.r * 1)
        // .style("fill", (d, i) => color(i))
        .style(
          "fill",
          (d, i) =>
            userRecord.likeSubCategories.includes(d.data)
              ? "#e0dfda" // Set the fill color to white for userLikedSubCategories
              : color(i) // Use the ordinal scale for other categories
        )
        .on("click", (event, d) => handleNodeClick(d))
        .on("mouseenter", handleNodeMouseEnter)
        .on("mouseleave", handleNodeMouseLeave);

      node
        .append("text")
        .attr("dy", ".3em")
        .attr("font-size", "1rem")
        .style("text-anchor", "middle")
        .text((d) => d.data.name);

      // Return a cleanup function to clear the SVG on unmount
      return () => {
        svg.selectAll("*").remove(); // Remove all child elements from the SVG
      };
    }
  }, [allSubCategories, userLikeSubs]);

  useEffect(() => {
    setUserLikeSubs(userRecord.likeSubCategories);
  }, []);

  const handleNodeMouseEnter = (event, d) => {
    // Scale up the circle on mouse enter
    d3.select(event.currentTarget)
      .select("circle")
      .transition()
      .duration(200)
      .attr("r", (d) => d.r * 1.2);
  };

  const handleNodeMouseLeave = (event, d) => {
    // Scale down the circle on mouse leave
    d3.select(event.currentTarget)
      .select("circle")
      .transition()
      .duration(200)
      .attr("r", (d) => d.r * 1);
  };

  const handleNodeClick = (selectedNode) => {
    console.log("userLikeSubs", userLikeSubs);
    setUserLikeSubs((prevSelected) => {
      if (selectedNode.data) {
        const isDuplicate = prevSelected.some(
          (item) => item.id === selectedNode.data.id
        );

        if (!isDuplicate) {
          // Reset appearance of all nodes
          d3.selectAll(`.node-${selectedNode.data.id}`)
            .select("circle")
            .style("fill", "#e0dfda")
            .transition()
            .duration(200)
            .attr("r", (d) => d.r * 1);

          const array = [...prevSelected, selectedNode.data];
          
          dispatch(setLikeSubCategories(array));
          return [...prevSelected, selectedNode.data];
        } else {
          // Remove the duplicate node from selectedSubCategories
          const updatedSelected = prevSelected.filter(
            (item) => item.id !== selectedNode.data.id
          );

          // Reset appearance of the removed node
          d3.select(`.node-${selectedNode.data.id}`)
            .select("circle")
            .style("fill", "#dfa5f2")
            .transition()
            .duration(200)
            .attr("r", (d) => d.r * 1);

          dispatch(setLikeSubCategories(updatedSelected));
          return updatedSelected;
        }
      }

      // If no changes, return the previous state
      return prevSelected;
    });
  };

  const confirm = async () => {
    try {
      const postData = {
        ...userRecord,
      };
      const response = await axios.post(
        `${BASE_URL}/userRecord/saveOrUpdateUserRecord`,
        postData,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      // Handle the response or update state as needed
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        showSuccessToast("Success");
      } else {
        // Handle the case where the request was not successful (status code outside the 200-299 range)
        console.error("Unsuccessful response:", response);
        showErrorToast("Unsuccessful response");
      }
    } catch (error) {
      showErrorToast(error.message);
      console.error("Error confirming selection:", error);
      // Handle the error as needed
    }
  };

  return (
    <>
      <CommonSection title={"Like Categories"} />
      <section>
        <Container>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="heading">
                <h2 className="title">What are you interested in?</h2>
                <p className="para">Choose three or more.</p>
              </div>
              <div className="listResult">
                <svg ref={svgRef}></svg>
              </div>
              <div className="continue">
                <div className="continue-sub">
                  <div className="continue-sub-1">
                    <button
                      onClick={() => {
                        confirm();
                      }}
                    >
                      Confirm
                    </button>
                    <button>next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <ToastContainer />
      </section>
    </>
  );
}

export default LikeCategorySelection;
