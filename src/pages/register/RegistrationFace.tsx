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
  // const initData = `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&auth_date=1738397696&signature=n17j-FeozqpC9-OBhm-0yTvuGL3LzB84MM9EqNacUIc42JPSjcwD16ElmtUij2H7EAST0fj5XtCeQjvy6H7NDA&hash=a42ba7c1f3bbad4bbc6b36e80ad1ec377a8ff12a814e827852ca0d5515f24704`
  const register = useCallback(
    async (photo: string) => {
      if (initData) {
        const res = (await registerUser(initData, photo)) ;
        setTimeout(() => navigate("/main"), 7000);
        console.log("response",res)
        return res!==null;
      } else return false;
    },
    [initData],
  );
  return (
    <div className="mt-4 flex w-full flex-col items-center pt-10">
      {JSON.stringify(initData, null,2)}
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
