import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./User";
import UserAddEdit from "./Useraddedit";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/modifyuser/:id/" element={<UserAddEdit />} />
    </Routes>
  );
};

export default UserRoutes;
