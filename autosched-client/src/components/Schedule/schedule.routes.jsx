import { Route, Routes } from "react-router-dom";
import React from "react";
import Schedule from "./Schedule.jsx";
import AddEditSchedule from "./AddEditSchedule.jsx";
import ScheduleView from "./ScheduleView.jsx";

const scheduleRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/:id" element={<ScheduleView />} />
        <Route path="/addschedule" element={<AddEditSchedule />} />
        <Route path="/editschedule/:id" element={<AddEditSchedule />} />
      </Routes>
    </>
  );
};

export default scheduleRoutes;
