import React from "react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./Schedule";
import AddSchedule from "./AddSchedule";
import ScheduleForm from "./ScheduleForm";

const ScheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/addschedule" element={<ScheduleForm />} />
      </Routes>
    </>
  );
};

export default ScheduleRoutes;
