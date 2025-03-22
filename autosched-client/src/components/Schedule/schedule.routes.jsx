import React from "react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./Schedule";
import AddSchedule from "./AddEditSchedule";
import ScheduleForm from "./ScheduleForm";
import AddEditSchedule from "./AddEditSchedule";

const ScheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/addschedule" element={<AddEditSchedule />} />
        <Route path="/editschedule/:id" element={<AddEditSchedule />} />
      </Routes>
    </>
  );
};

export default ScheduleRoutes;
