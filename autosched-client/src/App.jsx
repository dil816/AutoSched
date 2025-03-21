import { Navigate, Route, Routes } from "react-router-dom";
import AppRoute from "./routes";
import Navbar from "./components/shared/Navbar";
import useAuthContext from "./hooks/useAuthContext";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import AddProfessor from "./components/shared/AddProfessor";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/shared/Header";
import Login1 from "./components/Auth/Login1";
import SignUp1 from "./components/Auth/SignUp1";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      {/*<Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
       <Route
          path="/"
          element={user ? <AppRoute /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>*/}

      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Routes>
          <Route
            path="/*"
            element={user ? <AppRoute /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp1 /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login1 /> : <Navigate to="/" />}
          />
        </Routes>

        {/*<Login1 />*/}
        {/*<div className="flex flex-1 overflow-hidden h-full">*/}
        {/*<AppRoute />*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default App;
