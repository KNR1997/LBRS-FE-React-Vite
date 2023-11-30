import React, { useContext, useEffect, useRef, useState } from "react";
import CommonSection from "../shared/CommonSection";
import { Container } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import * as d3 from "d3";
import { AuthContext } from "../context/AuthContext";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { ToastContainer } from "react-toastify";

const fetchUserLikedNotLikedSubCategories = async (user) => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/user/getUserLikedNotLikedSubCategories`,
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
};

function LikeCategorySelection() {
  const svgRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const {
    data: userLikedNotLikedSubCategories,
    isLoading: isLoading,
    error: error,
  } = useQuery(
    [`getUserLikedSubCategories`],
    () => fetchUserLikedNotLikedSubCategories(user),
    {
      onError: (err) => {
        showErrorToast(err.message);
      },
    }
  );

  useEffect(() => {
    if (userLikedNotLikedSubCategories) {
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
      const combinedChildren = [
        ...userLikedNotLikedSubCategories.userLikedSubCategories,
        ...userLikedNotLikedSubCategories.userNotLikedSubCategories
      ];

      const nodes = d3.hierarchy({ children: combinedChildren }).sum((d) => 1);

      const node = svg
        .selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter((d) => !d.children)
        .append("g")
        .attr("class", (d) => `node node-${d.data.subCategory.id}`) // Add a unique class based on data.id
        .attr("transform", (d) => `translate(${d.x},${d.y})`)
        .on("mouseenter", handleNodeMouseEnter)
        .on("mouseleave", handleNodeMouseLeave);

      node
        .append("circle")
        .attr("r", (d) => d.r * 1)
        // .style("fill", (d, i) => color(i))
        .style("fill", (d, i) =>
        userLikedNotLikedSubCategories.userLikedSubCategories.includes(d.data)
          ? "#e0dfda" // Set the fill color to white for userLikedSubCategories
          : color(i) // Use the ordinal scale for other categories
      )
        .on("click", (event, d) => handleNodeClick(d))
        .on("mouseenter", handleNodeMouseEnter)
        .on("mouseleave", handleNodeMouseLeave);

      node
        .append("text")
        .attr("dy", ".3em")
        .attr("font-size", "1.5rem")
        .style("text-anchor", "middle")
        .text((d) => d.data.subCategory.name);

        if(userLikedNotLikedSubCategories.userLikedSubCategories) {
          let selectedSubCategories = [];
          userLikedNotLikedSubCategories.userLikedSubCategories.map((subCategory) => {
            selectedSubCategories.push(subCategory.subCategory);
          });
          setSelectedSubCategories((prevSelected) => {
            return [...prevSelected, ...selectedSubCategories];
          })
        }
    }
  }, [userLikedNotLikedSubCategories]);

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
    console.log(selectedNode.data.subCategory);
    setSelectedSubCategories((prevSelected) => {
      if (selectedNode.data.subCategory) {
        const isDuplicate = prevSelected.some(
          (item) => item.id === selectedNode.data.subCategory.id
        );

        if (!isDuplicate) {
          // Reset appearance of all nodes
          d3.selectAll(`.node-${selectedNode.data.subCategory.id}`)
            .select("circle")
            .style("fill", "#e0dfda")
            .transition()
            .duration(200)
            .attr("r", (d) => d.r * 1);

          return [...prevSelected, selectedNode.data.subCategory];
        } else {
          // Remove the duplicate node from selectedSubCategories
          const updatedSelected = prevSelected.filter(
            (item) => item.id !== selectedNode.data.subCategory.id
          );

          // Reset appearance of the removed node
          d3.select(`.node-${selectedNode.data.subCategory.id}`)
            .select("circle")
            .style("fill", "#dfa5f2")
            .transition()
            .duration(200)
            .attr("r", (d) => d.r * 1);

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
        // likeSubCategories: selectedSubCategories,
        likeSubCategories: selectedSubCategories.map(
          (subCategory) => subCategory.name
        ),
      };

      const response = await axios.post(
        `${BASE_URL}/user/createUserLikeSubCategories`,
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
                {/* <div className="interest-fields">
                  {subCategories &&
                    subCategories.map((category) => (
                      <div key={category.id} className="category-option">
                        <label>
                          <input
                            type="checkbox"
                            value={category.id}
                            onChange={() => handleCategorySelection(category)}
                          />
                          {category.name}
                        </label>
                      </div>
                    ))}
                </div> */}
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
                  </div>
                </div>
              </div>
              <div className="selectedSubCategories">
                <h3>Selected SubCategories:</h3>
                <ul>
                  {selectedSubCategories.map((subCategory) => (
                    <li key={subCategory.id}>{subCategory.name}</li>
                  ))}
                </ul>
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
