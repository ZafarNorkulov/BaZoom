import { useCallback, useContext } from "react";
import FaceDetector, {
  IdentificationState,
} from "../../components/face-detector/FaceDetector";
import { registerUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { StreamContext, StreamReadyContext } from "../../context/StreamCotext";
import i18next from "i18next";

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
  const stream = useContext(StreamContext)!;
  const streamReady = useContext(StreamReadyContext);
  const register = useCallback(
    async (photo: string) => {
      if (initData) {
        const res = (await registerUser(initData, photo)) !== null;
        setTimeout(() => navigate("/"), 7000);
        return res;
      } else return false;
    },
    [initData],
  );
  return (
    <div className="flex flex-col items-center pt-10">
      {streamReady ? (
        <FaceDetector
          tryProcessFaceData={register}
          externalStream={stream.current!}
          textForState={textForState}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default RegistrationFace;
