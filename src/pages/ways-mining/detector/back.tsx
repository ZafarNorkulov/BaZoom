import FaceDetector from "../../../components/face-detector/FaceDetector";

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



  // const detectFace = userStore.profile.has_verification_photo;
  return (
    <section>
      <div className="max-container">
        <FaceDetector cameraFacing="environment" />
      </div>
    </section>
  )
}

export default BackDetectorPage