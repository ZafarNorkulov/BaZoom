import FaceDetector from "../../../components/face-detector/FaceDetector"

const BackDetectorPage = () => {
  return (
    <section>
      <div className="max-container">
        <FaceDetector cameraFacing="environment" />
      </div>
    </section>
  )
}

export default BackDetectorPage