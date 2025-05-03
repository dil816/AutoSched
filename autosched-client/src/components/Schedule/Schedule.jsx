import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import Swal from "sweetalert2";

import {
  CloseCircle,
  Edit2,
  SearchNormal1,
  UserAdd,
  UserMinus,
} from "iconsax-react";
import UserAssign from "./UserAssign.jsx";
import UserUnAssign from "./UserUnAssign.jsx";

const ReSchedule = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDetails, setScheduleDetails] = useState({
    id: null,
    name: "",
  });
  const [isAssignPopupOpen, setIsAssignPopupOpen] = useState(false);
  const [isUnAssignPopupOpen, setIsUnAssignPopupOpen] = useState(false);

  const fetchSchedules = async () => {
    const response = await fetch("http://localhost:5008/api/Schedule", {
      headers: { Authorization: `Bearer ${user.accesstoken}` },
    });
    const data = await response.json();

    if (response.ok) {
      setScheduleData(data);
    }
  };
  useEffect(() => {

    if (user) {
      fetchSchedules();
    }
  }, [user, isAssignPopupOpen, isUnAssignPopupOpen]);

  const handleAddSchedule = () => {
    navigate("/schedules/addschedule");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this schedule?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) return;
  
    try {
      const response = await fetch(`http://localhost:5008/api/Schedule/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }
  
      const updatedSchedules = scheduleData.filter((item) => item.id !== id);
      setScheduleData(updatedSchedules);
  
      Swal.fire("Deleted!", "Schedule has been deleted.", "success");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Error deleting schedule", "error");
    }
  };
  

  const test = (ser) => {
    console.log(ser.find(e => e.email === user.email));
  }

  const handleApprove = (schedule) => {
    //console.log(scf.find(e => e.email === user.email));
    const data = schedule.examiners.find(e => e.email === user.email);

    if(data.approvalStatus === 1){
      console.log(2)
      AppoveReject(schedule.id,data.id,2)
    }else{
      console.log(1)
      AppoveReject(schedule.id,data.id,1)
    }
  }

  const  AppoveReject = async (scheduleId,ExaminarId,status) => {
    console.log(scheduleId,ExaminarId,status
    )
    const response = await fetch('http://localhost:5008/api/Schedule/ChangeScheduleApprovalStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        examinarId: ExaminarId,
        scheduleId: scheduleId,
        approvalStatus: status
      })
    })

    if (response.ok) {
      fetchSchedules();
    }
  }

  const approvestatus = (status) => {
    const data = schedule.examiners.find(e => e.email === user.email);
    if (status === 1) return 'Approved';
    if (status === 0) return 'Pending';
    return 'Reject';
  }

  const navigateToView = (id) => {
    console.log(id);
    navigate(`/schedules/${id}`);
  }

  return (
    <main className={`flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]`}>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Schedules management
        </h2>
        <p className="text-gray-500 mt-1">Manage your Schedules.</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">
            Schedules Count {scheduleData.length}
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-2 top-2.5 text-gray-400">
              <SearchNormal1 size="20" color="#697689" />
            </span>
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
            <span className="mr-2">🛠️</span> Filters
          </button>
        </div>
        {user.role === "1" &&
          <button
            onClick={handleAddSchedule}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            + Add Schedule
          </button>
        }
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              {/*
                <th className="py-3 px-4">
                  <input type="checkbox" className="rounded" />
                </th>
              */}
              <th className="py-3 px-4">Presentation</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Examiners</th>
              <th className="py-3 px-4">Students</th>
              <th className="py-3 px-4">StartTime</th>
              <th className="py-3 px-4">End Time</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Work</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((schedule, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >
                {/*
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                */}
                <td
                    onClick={() => navigateToView(schedule.id)}
                    className="py-3 px-4 flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-white">
                    p
                  </div>
                  <div>
                    <p className="text-gray-800">
                      {schedule.presentation.presentationName}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {schedule.presentation.type}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{schedule.date}</td>
                <td className="py-3 px-4">
                  {schedule.examiners.map((exm, i) => (
                    <span
                      key={i}
                      title={exm.userName}
                      className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 "
                    >
                      {exm.userName.charAt(0)}
                    </span>
                  ))}
                </td>
                <td className="py-3 px-4">
                  {/*<div className="flex space-x-2">*/}
                  {schedule.students.map((std, i) => (
                    <span
                      key={i}
                      title={std.userName}
                      className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
                    >
                      {std.userName.charAt(0)}
                    </span>
                  ))}
                  {/*</div>*/}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {schedule.startTime}
                </td>
                <td className="py-3 px-4 text-gray-600">{schedule.endTime}</td>
                <td className="py-3 px-4 text-gray-600">
                  {schedule.description}
                </td>
                {user.role === "1" ? (
                  <>
                    <td className="py-3 px-4 text-gray-600">
                      {/*{user.active && (
                    <span className="text-green-500 font-medium">Active</span>
                  )}*/}

                      <Link to={`/schedules/editschedule/${schedule.id}`}>
                        <Edit2 size="26" color="#697689" />
                      </Link>

                      {/*<button className="ml-2">⋮</button>*/}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAssignPopupOpen(true);
                          setScheduleDetails({
                            id: schedule.id,
                            name: schedule.presentation.presentationName,
                          });
                        }}
                      >
                        <UserAdd size="26" color="#697689" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUnAssignPopupOpen(true);
                          setScheduleDetails({
                            id: schedule.id,
                            name: schedule.presentation.presentationName,
                          });
                        }}
                      >
                        <UserMinus size="26" color="#697689" />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <button
                        type="button"
                        onClick={() => handleDelete(schedule.id)}
                      >
                        <CloseCircle size="26" color="#697689" />
                      </button>
                    </td>
                  </>
                ) : (
                  <td className="py-3 px-4 text-gray-600">
                    {
                      <button onClick={() => handleApprove(schedule)}>
                        {
                          schedule.examiners.find(
                          (e) =>
                            e.approvalStatus === 1 && e.email === user.email,
                        )
                          ? "Reject"
                          : "Approve"}
                      </button>
                    }
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAssignPopupOpen && (
        <UserAssign
          schedule={scheduleDetails}
          isOpen={isAssignPopupOpen}
          onClose={() => setIsAssignPopupOpen(false)}
        />
      )}
      {isUnAssignPopupOpen && (
        <UserUnAssign
          schedule={scheduleDetails}
          isOpen={isUnAssignPopupOpen}
          onClose={() => setIsUnAssignPopupOpen(false)}
        />
      )}
    </main>
  );
};

export default ReSchedule;
