import { useState } from "react";
//import { useAuthContext } from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //const { dispatch } = useAuthContext();

  const signup = async (username, email, password, firstname, lastname) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5008/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, firstname, lastname }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.title);
    }

    if (response.ok) {
      //save user to the local storage
      //localStorage.setItem("user", JSON.stringify(data));
      //update the authContext
      //dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
