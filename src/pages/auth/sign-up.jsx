import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import getAuthErrorMessage from "../../utilities/authErrorMessages";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFullname(value);
    console.log(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signed in successfully");
      setMessage(null);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      const message = getAuthErrorMessage(e.code);
      setMessage(message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-[320px] max-w-sm mx-auto p-4 m-10 border shadow-lg rounded-lg"
      >
        {message && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <div className="text-center">
          <h3>SignUp</h3>
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-slate-500 mb-2">
            Email
          </label>
          <Input
            id="email"
            className="h-12"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-slate-500 mb-2">
            Password
          </label>
          <Input
            id="password"
            className="h-12"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full h-12 text-md mt-4">Register</Button>
        <div className="text-center flex gap-2 items-baseline justify-center text-sm">
          if you have an account?
          <Link to="/login" className="text-sm underline text-primary">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUp;
