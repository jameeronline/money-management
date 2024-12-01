import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();

import { auth } from "../../config/firebase-config";

import { Button } from "@/components/ui/button";

import getAuthErrorMessage from "../../utilities/authErrorMessages";

const GoogleAuthLogin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = response.user;
      setMessage(null);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      const message = getAuthErrorMessage(e.code);
      setMessage(message);
    }
  };
  return (
    <div>
      <Button
        variant="secondary"
        className="w-full h-12"
        type="button"
        onClick={handleAuth}
      >
        Sign In with Google
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default GoogleAuthLogin;
