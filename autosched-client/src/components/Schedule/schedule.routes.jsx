import React from "react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./Schedule";
import AddSchedule from "./AddSchedule";

const ScheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/addschedule" element={<AddSchedule />} />
      </Routes>
    </>
  );
};

export default ScheduleRoutes;
