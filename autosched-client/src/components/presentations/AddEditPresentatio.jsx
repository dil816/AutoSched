import React, { useEffect, useState } from "react";
import { Setting2, Trash } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";

function AddEditPresentation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [formerror, setFormError] = useState({
    date: "",
    timeslot: "",
    presentation: "",
    moduleName: "",
    scheduleDescription: "",
  });

  useEffect(() => {
    if (id) {
      getScheduleDetails(parseInt(id));
    }
  }, [id]);

  const getScheduleDetails = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5008/api/Presentation/${id}` 
      );

    const data = await response.json();
    console.log(data);
    setFormData(data);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setFormError((preverror) => ({ ...preverror, [id]: "" }));
  };

  const validateForm = () => {
    const error = {};
    if (!formData.date) {
      error.date = "date required";
    }
    if (!formData.timeslot) {
      error.timeslot = "timeslot required";
    }
    if (!formData.presentation) {
      error.presentation = "presentation required";
    }
    if (!formData.moduleName) {
      error.moduleName = "moduleName required";
    }
    if (!formData.scheduleDescription) {
      error.scheduleDescription = "scheduleDescription required";
    }

    setFormError(error);
    return Object.keys(error) === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id){
        const response = await fetch(`http://localhost:5008/api/Presentation/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            
          });
    
          //const data = await response.json();
          console.log(formData)
          if (!response.ok){
            console.error("error")
          }
    
          if (response.ok){
            navigate('/presentations')
            console.log(formData)
          }
    
        /*if (validateForm()) {*/
          //setSchedules(formData);
            
          /*setFormData({
            day: "",
            timeslot: "",
            presentation: "",
            moduleName: "",
            scheduleDescription: "",
          });*/
          setFormError({});
    }else
    {
        const response = await fetch('http://localhost:5008/api/Presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        
      });

      const data = await response.json();
      console.log(formData)
      if (!response.ok){
        console.error("error")
      }

      if (response.ok){
        navigate('/presentations')
        console.log(formData)
      }

    /*if (validateForm()) {*/
      //setSchedules(formData);
        
      /*setFormData({
        day: "",
        timeslot: "",
        presentation: "",
        moduleName: "",
        scheduleDescription: "",
      });*/
      setFormError({});}
    //}
  };

  // Remove a schedule from the list
  /*const handleRemoveSchedule = (index) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };*/

  // Handle final submission of all schedules
  /*const handleSubmit = (e) => {
    e.preventDefault();
    if (schedules.length === 0) {
      alert("Please add at least one schedule before submitting.");
      return;
    }
    console.log("Submitting all schedules:", schedules);
    // Here you can send the data to an API or perform other actions
    setSchedules([]); // Clear the list after submission
  };*/

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Add Schedule</h2>
          <button className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition duration-200">
            <Setting2 size="20" color="#3b82f6" className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* presentation Information Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              Presentation Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* StartTime */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="day"
                >
                  StartTime
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.date ? "border-red-500" : ""
                  }`}
                />
                {formerror.date && (
                  <p className="text-red-500 text-sm mt-1">{formerror.date}</p>
                )}
              </div>

              {/* Endtime */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="timeslot"
                >
                  EndTime
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.timeslot ? "border-red-500" : ""
                  }`}
                />
                {formerror.timeslot && (
                  <p className="text-red-500 text-sm mt-1">
                    {formerror.timeslot}
                  </p>
                )}
              </div>

              {/* Presentation Name */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="presentation"
                >
                  Presentation Name
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.presentation ? "border-red-500" : ""
                  }`}
                  placeholder="Presentations"
                />
                {formerror.presentation && (
                  <p className="text-red-500 text-sm mt-1">
                    {formerror.presentation}
                  </p>
                )}
              </div>


              {/* type */}
              <div>
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="moduleName"
                >
                  type
                </label>
                <input
                  type="text"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formerror.moduleName ? "border-red-500" : ""
                  }`}
                  placeholder="Module Name"
                />
                {formerror.moduleName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formerror.moduleName}
                  </p>
                )}
              </div>
            </div>
            
          </div>

          {/* ReSchedule Description Section */}
          <div>
            {/*<h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
              Description
            </h3>*/}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="scheduleDescription"
              >
                 Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formerror.scheduleDescription ? "border-red-500" : ""
                }`}
                rows="4"
                placeholder="Description"
              ></textarea>
              {formerror.scheduleDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {formerror.scheduleDescription}
                </p>
              )}
            </div>
          </div>

          {/* Add Another ReSchedule and Submit Buttons */}
          <div className="flex justify-end">
            {/*<button
              type="button"
              onClick={handleAddSchedule}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 mr-4"
            >
              Add Another ReSchedule
            </button>*/}
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* List of Added Schedules */}
      {/*{schedules.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Added Schedules
          </h3>
          <ul className="space-y-4">
            {schedules.map((schedule, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {schedule.day} at {schedule.timeslot}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {schedule.professorName} - {schedule.moduleName}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveSchedule(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size="20" color="#ef4444" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}*/}
    </main>
  );
}

export default AddEditPresentation;
