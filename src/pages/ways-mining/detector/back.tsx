
// import { useStore } from "../../../components/store-provider/StoreProvider";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const BackDetectorPage = () => {
  // const [isDetectingEnabled, setDetectingEnabled] = useState(true);
  // const [stream, streamReady] = useCamera();
  // const [, initData] = useInitData();
  // const { userStore } = useStore();

  // const onFaceDetect = useCallback(
  //   async (photo: string) => {
  //     const res = await submitPhoto(photo, initData!);
  //     if (res) {
  //       setTimeout(() => {
  //         setDetectingEnabled(false);
  //         setTimeout(() => {
  //           setDetectingEnabled(true);
  //         }, 4000);
  //       }, 7000);
  //     }
  //     return res;
  //   },
  //   [initData],
  // );
  const location = useLocation();

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Kamera oqimini boshlash
    const startCamera = async () => {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "environment", // Orqa kamera
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera(); // Kamera ishga tushadi

    // Cleanup (sahifa o'zgarganda yoki sahifa yopilganda kamerani o'chirish)
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Oqimni to'xtatish
      }
    };
  }, [location.pathname]); // location.pathname o'zgarganda qayta ishga tushadi


  // const detectFace = userStore.profile.has_verification_photo;
  return (
    <section>
      <div className="max-container">

        {/* {isDetectingEnabled&& streamReady && (

        <FaceDetector  tryProcessFaceData={onFaceDetect}  externalStream={stream} cameraFacing="environment" />
      )} */}
        <video className="w-[200px] aspect-square h-[200px]" ref={videoRef} autoPlay playsInline muted />
      </div>
    </section>
  )
}

export default BackDetectorPage