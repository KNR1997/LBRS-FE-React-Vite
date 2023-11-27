import { useQuery } from "react-query";
import axios from "axios";
import { STRAPI_URL } from "../utils/config";
import { showErrorToast } from "../utils/toastUtils";

const fetchPlace = async (placeCategory, placeId) => {
  const res = await axios({
    method: "get",
    url: `${STRAPI_URL}/api/${placeCategory}/${placeId}/?populate=*`,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
    },
  });
  return res.data;
};

const fetchCategoryPlaces = async (placeCategory, page) => {
  const res = await axios({
    method: "get",
    url: `${STRAPI_URL}/api/${placeCategory}?populate=*&pagination[pageSize]=8&pagination[page]=${page}`,
    headers: {
      Authorization: "Bearer " + import.meta.env.VITE_STRAPI_API_TOKEN,
    },
  });
  return res.data;
};

export const getPlaceData = (placeCategory, placeId) => {
  return useQuery(
    [`fetchPlace${placeId}`],
    () => fetchPlace(placeCategory, placeId),
    {
      onError: (err) => {
        showErrorToast(err.message);
        console.error("Error:", err);
      },
    }
  );
};

export const getCategoryPlaces = (placeCategory, page) => {
  return useQuery(
    [`fetchCategoryPlaces${placeCategory}${page}`],
    () => fetchCategoryPlaces(placeCategory, page),
    {
      onError: (err) => {
        showErrorToast(err.message);
        console.error("Error:", err);
      },
    }
  );
};
