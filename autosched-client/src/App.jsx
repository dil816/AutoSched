import { Navigate, Route, Routes } from "react-router-dom";
import AppRoute from "./routes";
import useAuthContext from "./hooks/useAuthContext";
import Header from "./components/shared/Header";
import Login from "./components/Auth/Login.jsx";
import SignUp from "./components/Auth/SignUp.jsx";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Routes>
          <Route
            path="/*"
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
        </Routes>
      </div>
    </>
  );
}

export default App;
