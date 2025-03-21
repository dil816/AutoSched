import { useState } from "react";
import useSignup from "../../hooks/usesignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const hndleSignup = async (e) => {
    e.preventDefault();
    //console.log(email, password);
    await signup("", email, password, "", "");
  };
  return (
    <form className="signup" onSubmit={hndleSignup}>
      <h3>Sign UP</h3>

      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
