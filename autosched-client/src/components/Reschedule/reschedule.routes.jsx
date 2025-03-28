import React from "react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./Schedule";
import AddSchedule from "./AddEditReSchedule.jsx";
import ScheduleForm from "./ScheduleForm";
import AddEditSchedule from "./AddEditReSchedule.jsx";
import ReSchedule from "./ReSchedule";
import AddEditReSchedule from "./AddEditReSchedule.jsx";

const ScheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/addreschedule" element={<AddEditReSchedule />} />
        <Route path="/editreschedule/:id" element={<AddEditReSchedule />} />
      </Routes>
    </>
  );
};

export default ScheduleRoutes;
