import { useCallback, useState } from "react";
import RegistrationFace from "./RegistrationFace";
import RegistrationStarter from "./RegistrationStarter";

function RegisterPage() {
  const [continuePressed, setContinuePressed] = useState(false);
  const onContinue = useCallback(() => {
    setContinuePressed(true);
  }, []);
  return continuePressed ? (
    <RegistrationFace />
  ) : (
    <RegistrationStarter onContinue={onContinue} />
  );
}

export default RegisterPage;
