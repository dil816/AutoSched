import React from "react";
import { Route, Routes } from "react-router-dom";
import Schedule from "./Schedule";
import AddSchedule from "./AddEditSchedule";
import ScheduleForm from "./ScheduleForm";
import AddEditSchedule from "./AddEditSchedule";
import ReSchedule from "./ReSchedule";

const ScheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ReSchedule />} />
        <Route path="/addschedule" element={<AddEditSchedule />} />
        <Route path="/editschedule/:id" element={<AddEditSchedule />} />
      </Routes>
    </>
  );
};

export default ScheduleRoutes;
