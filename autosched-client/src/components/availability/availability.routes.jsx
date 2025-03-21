import React from "react";
import { Route, Routes } from "react-router-dom";
import ExaminarAvailability from "./ExaminarAvailability";

const AvailabilityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExaminarAvailability />} />
    </Routes>
  );
};

export default AvailabilityRoutes;
