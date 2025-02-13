import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useCamera } from "../../../components/camera-provider/CameraProvider";
import FaceDetector, { IdentificationState } from "../../../components/face-detector/FaceDetector"
import { useCallback,  useState } from "react";
import { submitPhoto } from "../../../services/PhotoService";
import { useTranslation } from "react-i18next";
import BalanceStatus from "../../../components/balanceStatus";
// import { useSearchParams } from "react-router-dom";
import { useStore } from "../../../components/store-provider/StoreProvider";

const Detector = () => {
    const [isDetectingEnabled, setDetectingEnabled] = useState(true);
    const [stream, streamReady] = useCamera();
    const [, initData] = useInitData();
    const { t } = useTranslation()
    // const [searchParams] = useSearchParams()
    const {userStore} = useStore()


    const onFaceDetect = useCallback(
        async (photo: string) => {
            const res = await submitPhoto(photo, initData!);
            if (res) {
                setTimeout(() => {
                    setDetectingEnabled(false);
                    setTimeout(() => {
                        setDetectingEnabled(true);
                    }, 4000);
                }, 7000);
            }
            return res;
        },
        [initData],
    );

    // const updateBalance = useCallback(() => {
    //     userStore.fetchProfileInfo();
    // }, [searchParams]);

    // useEffect(() => {
    //     updateBalance();
    // }, [updateBalance]);


    function textForState(identificationState: IdentificationState) {
        switch (identificationState) {
          case IdentificationState.POSITIONING:
            return t("pages.main.scannerStates.positioning");
          case IdentificationState.PENDING:
            return t("pages.main.scannerStates.pending");
          case IdentificationState.SUCCESS:
            // updateBalance();
            return t("pages.main.scannerStates.success");
          case IdentificationState.ERROR:
            return t("pages.main.scannerStates.error");
        }
      }
    
      function textForStateUnverified(
        identificationState: IdentificationState,
      ): string {
        switch (identificationState) {
          case IdentificationState.POSITIONING:
            return t("pages.main.scannerStates.positioningWithout");
          case IdentificationState.PENDING:
            return t("pages.main.scannerStates.pendingWithout");
          case IdentificationState.SUCCESS:
            // updateBalance();
            return t("pages.main.scannerStates.successWithout");
          case IdentificationState.ERROR:
            return t("pages.main.scannerStates.errorWithout");
        }
      }


       const detectFace = userStore.profile.has_verification_photo;

    return (
        <section>
            <div className="max-container !mt-[20px]">
                {isDetectingEnabled && streamReady && (
                     <FaceDetector
                     tryProcessFaceData={onFaceDetect}
                     textForState={detectFace ? textForState : textForStateUnverified}
                     externalStream={stream}
                     detectFace={detectFace}
                    // cameraFacing={detectFace ? "user" : "environment"}
                   />)}
                    <BalanceStatus store={userStore}/>
            </div>
        </section>
    )
}

export default Detector