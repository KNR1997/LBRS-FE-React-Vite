import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Beaches from "../pages/Beaches";
import BeachDetails from "../pages/BeachDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Waterfalls from "../pages/Waterfalls";
import WaterfallDetails from "../pages/WaterfallDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import LikeCategorySelection from "../pages/LikeCategorySelection";
import LocationSelection from "../pages/LocationSelection";

function Routers() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/beaches" element={<Beaches />} />
        <Route path="/beaches/:placeId" element={<BeachDetails />} />
        <Route path="/waterfalls" element={<Waterfalls />} />
        <Route path="/waterfalls/:placeId" element={<WaterfallDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/tours/search" element={<SearchResultList />} />
        <Route path="/likeFiedls" element={<LikeCategorySelection />} />
        <Route path="/locationSelection" element={<LocationSelection />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default Routers;
