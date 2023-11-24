import React, { useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import { Container } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useQuery } from "react-query";
import axios from "axios";

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

  const handleCategorySelection = () => {
    
  }

  console.log("subCategories: ", subCategories);

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
                <div className="interest-fields">
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
                </div>
              </div>
              <div className="continue">
                <div className="continue-sub">
                  <div className="continue-sub-1">
                    <button>Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default LikeCategorySelection;
