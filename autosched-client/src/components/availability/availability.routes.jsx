import React from "react";
import { Route, Routes } from "react-router-dom";
import ExaminarAvailability from "./ExaminarAvailability";
import AddEditAvailability from "./AddEditAvailability";

const AvailabilityRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ExaminarAvailability />} />
      <Route path="/addavailability" element={<AddEditAvailability />} />
      <Route path="/addavailability/:id" element={<AddEditAvailability />} />
    </Routes>
  );
};

export default AvailabilityRoutes;
