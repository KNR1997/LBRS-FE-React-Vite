import axios from "axios";
import { BASE_URL } from "../utils/config";

export const fetchCategoryPlaces = async (placeCategory,page) => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/Place/placeCategory/${placeCategory}/${page}`,
  });
  return res.data;
};

export const fetchPlace = async (placeId) => {
  const res = await axios({
    method: "get",
    url: `${BASE_URL}/Place/${placeId}`,
  });
  return res.data;
};

