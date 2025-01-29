

import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { useCamera } from "../../../components/camera-provider/CameraProvider";
import FaceDetector from "../../../components/face-detector/FaceDetector"
import { useCallback, useState } from "react";
import { submitPhoto } from "../../../services/PhotoService";

const BackDetectorPage = () => {
  const [isDetectingEnabled, setDetectingEnabled] = useState(true);
  const [stream, streamReady] = useCamera();
  const [, initData] = useInitData();

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



  return (
    <section>
      <div className="max-container">

        {isDetectingEnabled && streamReady && (

          <FaceDetector tryProcessFaceData={onFaceDetect} externalStream={stream} cameraFacing="environment" />
        )}
      </div>
    </section>
  )
}

export default BackDetectorPage