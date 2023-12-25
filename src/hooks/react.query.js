import { useQuery } from "react-query";
import { fetchCategoryPlaces, fetchPlace } from "./useFetch";
import { showErrorToast } from "../utils/toastUtils";

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

export const getPlaceData = (placeId) => {
    return useQuery(
      [`fetchPlace${placeId}`],
      () => fetchPlace(placeId),
      {
        onError: (err) => {
          showErrorToast(err.message);
          console.error("Error:", err);
        },
      }
    );
};