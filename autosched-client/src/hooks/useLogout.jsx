//import { useAuthContext } from "./useAuthContext";
//final step work
//import { useWorkoutsContext } from "../hooks/useWorkoutContext";

import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  //const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dipatch logout action
    dispatch({ type: "LOGOUT" });
    //when logout this clear global workout state
    //workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};

export default useLogout;
