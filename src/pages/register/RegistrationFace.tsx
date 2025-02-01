import { useCallback } from "react";
import FaceDetector, {
  IdentificationState,
} from "../../components/face-detector/FaceDetector";
import { registerUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import i18next from "i18next";
import { useCamera } from "../../components/camera-provider/CameraProvider";

function textForState(identificationState: IdentificationState) {
  switch (identificationState) {
    case IdentificationState.POSITIONING:
      return i18next.t("pages.registration.scannerStates.positioning");
    case IdentificationState.PENDING:
      return i18next.t("pages.registration.scannerStates.pending");
    case IdentificationState.SUCCESS:
      return i18next.t("pages.registration.scannerStates.success");
    case IdentificationState.ERROR:
      return i18next.t("pages.registration.scannerStates.error");
  }
}

function RegistrationFace() {
  const [, initData] = useInitData();
  const navigate = useNavigate();
  const [stream, streamReady] = useCamera();
  const register = useCallback(
    async (photo: string) => {
      if (initData) {
        const res = (await registerUser(initData, photo)) !== null;
        setTimeout(() => navigate("/main"), 7000);
        return res;
      } else return false;
    },
    [initData],
  );
  return (
    <div className="mt-4 flex w-full flex-col items-center pt-10">
      {streamReady ? (
        <FaceDetector
          tryProcessFaceData={register}
          externalStream={stream}
          textForState={textForState}
          detectFace
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default RegistrationFace;
