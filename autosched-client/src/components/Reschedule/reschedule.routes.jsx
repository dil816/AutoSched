import React from "react";
import { Route, Routes } from "react-router-dom";
import AddEditReSchedule from "./AddEditReSchedule.jsx";
import ReSchedule from "./ReSchedule.jsx";

const RescheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReSchedule />} />
        <Route path="/addreschedule" element={<AddEditReSchedule />} />
        <Route path="/editreschedule/:id" element={<AddEditReSchedule />} />
      </Routes>
    </>
  );
};

export default RescheduleRoutes;
