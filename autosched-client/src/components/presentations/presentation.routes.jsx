import React from "react";
import { Route, Routes } from "react-router-dom";
import Presentation from "./Presentation";
import AddEditPresentation from "./AddEditPresentatio";

const PresentationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Presentation />} />
      <Route path="/addeditpresentation" element={<AddEditPresentation />} />
      <Route path="/addeditpresentation/:id" element={<AddEditPresentation />} />
    </Routes>
  );
};

export default PresentationRoutes;
