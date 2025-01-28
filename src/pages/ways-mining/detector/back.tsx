import FaceDetector from "../../../components/face-detector/FaceDetector"

const BackDetectorPage = () => {
  return (
    <section>
      <div className="max-container">
        <FaceDetector cameraType="back" />
      </div>
    </section>
  )
}

export default BackDetectorPage