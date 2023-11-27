import React, { useEffect, useRef, useState } from "react";
import CommonSection from "../shared/CommonSection";
import { Container } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useQuery } from "react-query";
import axios from "axios";
import * as d3 from "d3";

function LikeCategorySelection() {
  const { data: subCategories, isLoading, error } = useQuery(
    [`getAllSubCategories`],
    async () => {
      const res = await axios({
        method: "get",
        url: `${BASE_URL}/subCategories/getAllSubCategories`,
      });
      return res.data;
    }
  );

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const svgRef = useRef(null);

  useEffect(() => {
    if (subCategories) {
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

      const nodes = d3.hierarchy({ children: subCategories }).sum((d) => 1);

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
        .style("fill", (d, i) => color(i))
        .on("click", (event, d) => handleNodeClick(d))
        .on("mouseenter", handleNodeMouseEnter)
        .on("mouseleave", handleNodeMouseLeave);

      node
        .append("text")
        .attr("dy", ".3em")
        .attr("font-size", "1.5rem")
        .style("text-anchor", "middle")
        .text((d) => d.data.name);
    }
  }, [subCategories]);

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
    console.log(selectedNode.data);
    setSelectedSubCategories((prevSelected) => {
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

          return updatedSelected;
        }
      }

      // If no changes, return the previous state
      return prevSelected;
    });
  };

  console.log("selectedSubCategores: ", selectedSubCategories);

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
                    <button>Continue</button>
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
      </section>
    </>
  );
}

export default LikeCategorySelection;
