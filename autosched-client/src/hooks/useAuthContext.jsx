import { useContext } from "react";
import AuthContext from "../context/Authcontext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("usecontext must be used inside an WorkoutContextProvider");
  }

  return context;
};

export default useAuthContext;
