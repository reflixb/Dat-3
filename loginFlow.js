import { useState } from "react";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

export function LoginFlow() {
  const [isSignUp, setIsSignUp] = useState(true);

  if (isSignUp) return <SignUpScreen onSignIn={() => setIsSignUp(false)} />;

  return <SignInScreen onSignIn={() => setIsSignUp(true)} />;
}
