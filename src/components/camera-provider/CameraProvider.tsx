import { useContext, useEffect, useRef, useState } from "react";
import { StreamContext, StreamReadyContext } from "../../context/StreamCotext";
import { useShowPopup } from "@vkruglikov/react-telegram-web-app";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../store-provider/StoreProvider.tsx";
import { observer } from "mobx-react-lite";

const CameraProvider = observer(() => {
  const streamRef = useRef<MediaStream>();
  const [streamReady, setStreamReady] = useState(false);
  const showPopup = useShowPopup();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userStore } = useStore();

  useEffect(() => {
    navigator.mediaDevices;
    const st = navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 300 },
          height: { ideal: 300 },
          facingMode: userStore.profile.has_verification_photo
            ? "user"
            : "environment",
        },
      })
      .then((stream) => {
        streamRef.current = stream;
        setStreamReady(true);
        return stream;
      })
      .catch(() => {
        if (window.location.pathname !== "/register")
          showPopup({
            message: t("pages.main.scannerStates.cameraIsNotAllowed"),
            buttons: [{ text: t("pages.main.scannerStates.inviteFriend") }],
          }).then(() => navigate("/friends"));
        else
          showPopup({
            message: t("pages.register.cameraIsNotAllowedReg"),
          }).then(() => window.location.reload());
        return undefined;
      });
    return () => {
      st.then((s) => s?.getTracks().forEach((t) => t.stop()));
    };
  }, []);

  return (
    <StreamContext.Provider value={streamRef}>
      <StreamReadyContext.Provider value={streamReady}>
        <Outlet />
      </StreamReadyContext.Provider>
    </StreamContext.Provider>
  );
});

const useCamera = (): [MediaStream | undefined, boolean] => {
  const streamRef = useContext(StreamContext);
  const streamReady = useContext(StreamReadyContext);

  return [streamRef?.current, streamReady];
};

export default CameraProvider;
export { useCamera };
