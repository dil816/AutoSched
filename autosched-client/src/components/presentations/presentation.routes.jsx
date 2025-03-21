import React from "react";
import { Route, Routes } from "react-router-dom";
import Presentation from "./Presentation";

const PresentationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Presentation />} />
    </Routes>
  );
};

export default PresentationRoutes;
