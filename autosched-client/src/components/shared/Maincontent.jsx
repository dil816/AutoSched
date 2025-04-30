// components/MainContent.jsx
import React, { useState } from "react";
import { Trash } from "iconsax-react"; // For the delete icon

function MainContent() {
  // State to manage multiple accommodation entries
  const [accommodations, setAccommodations] = useState([]);
  const [formData, setFormData] = useState({
    accommodationName: "",
    email: "",
    contactNumber: "",
    country: "",
    district: "",
    city: "",
    availability: "",
    additionalInfo: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Add a new accommodation to the list
  const handleAddAccommodation = (e) => {
    e.preventDefault();
    if (formData.accommodationName && formData.email) {
      // Basic validation
      setAccommodations([...accommodations, formData]);
      // Reset form after adding
      setFormData({
        accommodationName: "",
        email: "",
        contactNumber: "",
        country: "",
        district: "",
        city: "",
        availability: "",
        additionalInfo: "",
      });
    } else {
      alert(
        "Please fill in the required fields (Accommodation Name and Email)."
      );
    }
  };

  // Remove an accommodation from the list
  const handleRemoveAccommodation = (index) => {
    setAccommodations(accommodations.filter((_, i) => i !== index));
  };

  // Handle final submission of all accommodations
  const handleSubmit = (e) => {
    e.preventDefault();
    if (accommodations.length === 0) {
      alert("Please add at least one accommodation before submitting.");
      return;
    }
    console.log("Submitting all accommodations:", accommodations);
    // Here you can send the data to an API or perform other actions
    setAccommodations([]); // Clear the list after submission
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Accommodation
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button className="px-4 py-2 text-red-500 border-b-2 border-red-500 font-medium">
          Accommodation Details
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Rooms
        </button>
        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
          Media
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6">
          {/* Accommodation Name */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="accommodationName"
            >
              Accommodation Name
            </label>
            <input
              type="text"
              id="accommodationName"
              value={formData.accommodationName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Accommodation Name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contact Number"
            />
          </div>

          {/* Country, District, City */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="country"
              >
                Country
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a Country</option>
                <option value="Country 1">Country 1</option>
                <option value="Country 2">Country 2</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="district"
              >
                District
              </label>
              <select
                id="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Please Select a Country First</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="city"
              >
                City
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Please Select a District First</option>
              </select>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="availability"
            >
              Availability
            </label>
            <select
              id="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Additional Information */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="additionalInfo"
            >
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Additional Information"
            ></textarea>
          </div>

          {/* Add Another Accommodation Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddAccommodation}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 mr-4"
            >
              Add Another Accommodation
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Submit All
            </button>
          </div>
        </form>
      </div>

      {/* List of Added Accommodations */}
      {accommodations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Added Accommodations
          </h3>
          <ul className="space-y-4">
            {accommodations.map((accommodation, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {accommodation.accommodationName}
                  </p>
                  <p className="text-gray-500 text-sm">{accommodation.email}</p>
                </div>
                <button
                  onClick={() => handleRemoveAccommodation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size="20" color="#ef4444" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default MainContent;
