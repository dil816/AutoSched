import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/shared/Sidebar";
import Dashboardone from "./components/dashboard/Dashboardone";
import Login1 from "./components/Auth/Login1";
import UserRoutes from "./components/User/user.routes";
import RescheduleRoutes from "./components/Reschedule/reschedule.routes.jsx";
import AddProfessor from "./components/shared/AddProfessor";
import MainContent from "./components/shared/Maincontent";
import ScheduleForm from "./components/Schedule/AddEditSchedule.jsx";
import PresentationRoutes from "./components/presentations/presentation.routes";
import ExaminarAvailability from "./components/availability/ExaminarAvailability";
import AvailabilityRoutes from "./components/availability/availability.routes";
import ScheduleRoutes from "./components/Schedule/schedule.routes.jsx";

const AppRoute = () => {
  return (
    <>
      <div className="flex flex-1 overflow-hidden h-full">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users/*" element={<UserRoutes />} />
          <Route path="/reschedules/*" element={<RescheduleRoutes />} />
          <Route path="/presentations/*" element={<PresentationRoutes />} />
          <Route path="/availability/*" element={<AvailabilityRoutes />} />
          <Route path="/schedules/*" element={<ScheduleRoutes />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoute;
