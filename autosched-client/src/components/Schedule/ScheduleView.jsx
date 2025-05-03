import React, {useEffect, useState} from "react";
import useAuthContext from "../../hooks/useAuthContext.jsx";
import {useParams} from "react-router-dom";
import {format} from "date-fns";
import UserUnAssign from "./UserUnAssign.jsx";
import UserSwap from "./UserSwap.jsx";

const ScheduleView = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const [schedulesData, setSchedulesData] = useState([]);
    const [scheduleDetails, setScheduleDetails] = useState({
        id: null,
        name: "",
        rejectedUserId:""
    });
    const [isSwapPopupOpen, setIsSwapPopupOpen] = useState(false);

    const fetchSchedules = async () => {
        const response = await fetch(`http://localhost:5008/api/Schedule/${id}`, {
            headers: { Authorization: `Bearer ${user.accesstoken}` },
        });
        const data = await response.json();

        if (response.ok) {
            setSchedulesData(data);
        }
    };

    useEffect(() => {
        if (user){
            fetchSchedules()
        }
    }, [id,user,isSwapPopupOpen]);

    const approvestatus = (status) => {
        if (status === 1) return 'Approved';
        if (status === 0) return 'Pending';
        return 'Reject';
    }

    const statusColor = (status) => {
        if (status === 1) return 'bg-green-200';
        if (status === 0) return 'bg-orange-200';
        return 'bg-red-200'
    }

    return (
      <>
        <main className={`flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]`}>
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h1 className="text-3xl font-bold">
                {schedulesData.presentation?.presentationName.toUpperCase()} S{schedulesData.id}
              </h1>
              <p className="text-lg">
                Type: {schedulesData.presentation?.type}
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Schedule
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Date:{" "}
                    {schedulesData.date
                      ? format(new Date(schedulesData.date), "MMMM dd, yyyy")
                      : ""}
                  </p>
                  <p className="text-gray-600">
                    Time:{" "}
                    {schedulesData.startTime
                      ? `${format(new Date(`1970-01-01T${schedulesData.startTime}`), "hh:mm a")} - ${format(new Date(`1970-01-01T${schedulesData.endTime}`), "hh:mm a")}`
                      : ""}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Description
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {schedulesData.description}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  Examiners
                </h2>
                <div className="mt-4 space-y-4">
                  {schedulesData.examiners
                    ? schedulesData.examiners.map((examiner) => (
                        <div
                          key={examiner.id}
                          className={`relative border rounded-lg p-4 ${statusColor(examiner.approvalStatus)}`}
                        >
                          <p className="font-medium text-gray-800">
                            {examiner.userName}
                          </p>
                          <p className="text-gray-600">{examiner.email}</p>
                          <p className="text-sm text-gray-800">
                            Status : {approvestatus(examiner.approvalStatus)}
                          </p>
                          {examiner.approvalStatus === 2 && user.role === "1" && (
                            <button
                                onClick={() => {
                                    setIsSwapPopupOpen(true);
                                    setScheduleDetails({
                                        id: schedulesData.id,
                                        name: schedulesData.presentation.presentationName,
                                        rejectedUserId: examiner.id
                                    });
                                }}
                                className="absolute top-5 right-5 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                              Swap Examiner
                            </button>
                          )}
                        </div>
                      ))
                    : ""}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800">
                  Students
                </h2>
                <div className="mt-4 space-y-4">
                  {schedulesData.students
                    ? schedulesData.students.map((student) => (
                        <div
                          key={student.id}
                          className="border rounded-lg p-4 bg-gray-50"
                        >
                          <p className="font-medium text-gray-800">
                            {student.userName}
                          </p>
                          <p className="text-gray-600">{student.email}</p>
                          {/*<p className="text-sm text-gray-500">Status: {student.approvalStatus}</p>*/}
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
            {isSwapPopupOpen && (
                <UserSwap
                    schedule={scheduleDetails}
                    isOpen={isSwapPopupOpen}
                    onClose={() => setIsSwapPopupOpen(false)}
                />
            )}
        </main>
      </>
    );
}

export default ScheduleView;