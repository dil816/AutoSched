import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./User";
import UserAddEdit from "./Useraddedit";
import  AddUser  from "./AddUser";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/modifyuser/:id" element={<UserAddEdit />} />
      <Route path="/adduser" element={<AddUser />} />
    </Routes>
  );
};

export default UserRoutes;
