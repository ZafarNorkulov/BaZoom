import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as faceapi from "face-api.js";
import "./face-detector.css";
import {
  FaceDetectContext,
  TextForStateContext,
} from "../../context/MainContext";

enum IdentificationState {
  POSITIONING,
  PENDING,
  SUCCESS,
  ERROR,
}

const VIDEO_RESOLUTION_HEIGHT = 300;
const VIDEO_RESOLUTION_WIDTH = 300;

const INTERSECTION_LOWER_THRESHOLD = 0.9;
const INTERSECTION_UPPER_THRESHOLD = 1.2;

const CENTER_RADIUS = 70;
const CENTER_X = VIDEO_RESOLUTION_WIDTH / 2 - CENTER_RADIUS;
const CENTER_Y = VIDEO_RESOLUTION_HEIGHT / 2 - CENTER_RADIUS + 10;
const CENTER_SIDE = CENTER_RADIUS * 2;
const CENTER_SQUARE = Math.pow(CENTER_SIDE, 2);

function overlayBackgroundFromState(state: IdentificationState) {
  switch (state) {
    case IdentificationState.POSITIONING:
      return "#939393";
    case IdentificationState.PENDING:
      return "#896CFE";
    case IdentificationState.SUCCESS:
      return "#896CFE";
    case IdentificationState.ERROR:
      return "#F00";
  }
}

function isFaceInTheCenter(faceDetection: faceapi.FaceDetection): boolean {
  const { y, x, width, height } = faceDetection.box;

  const intersectionSquare =
    (Math.min(CENTER_X + CENTER_SIDE, x + width) - Math.max(x, CENTER_X)) *
    (Math.min(CENTER_Y + CENTER_SIDE, y + height) - Math.max(y, CENTER_Y));

  const ratio = intersectionSquare / CENTER_SQUARE;
  const boxSquare = width * height;

  return (
    ratio > INTERSECTION_LOWER_THRESHOLD &&
    boxSquare / CENTER_SQUARE < INTERSECTION_UPPER_THRESHOLD
  );
}

function defaultTextForState(identificationState: IdentificationState) {
  switch (identificationState) {
    case IdentificationState.POSITIONING:
      return "Совместите своё лицо с маской";
    case IdentificationState.PENDING:
      return "Подождите, идет обработка фото";
    case IdentificationState.SUCCESS:
      return "Обработка успешо завершена";
    case IdentificationState.ERROR:
      return "На фото не вы или это выражение лица уже есть в базе. Попробуйте изменить выражение лица";
  }
}

interface FaceDetectorProps {
  tryProcessFaceData?: (data: string) => Promise<boolean>;
  textForState?: (state: IdentificationState) => string;
  externalStream?: MediaStream;
  detectFace: boolean;
}

const FaceDetector = memo(function FaceDetector({
  tryProcessFaceData,
  textForState,
  externalStream,
  detectFace,
}: FaceDetectorProps) {
  const [isInitializing, setInitiallzing] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [identificationState, setIdentificationState] =
    useState<IdentificationState>(IdentificationState.POSITIONING);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (textForState == null) textForState = defaultTextForState;
  if (textForState == undefined)
    textForState = useContext(TextForStateContext)!;
  if (tryProcessFaceData == null)
    tryProcessFaceData = useContext(FaceDetectContext)!;

  async function loadModel() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }

  // async function startCamera() {
  //   navigator.mediaDevices;
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: {
  //       width: { ideal: VIDEO_RESOLUTION_WIDTH },
  //       height: { ideal: VIDEO_RESOLUTION_HEIGHT },
  //     },
  //   });
  //
  //   videoRef.current!.srcObject = stream;
  //
  //   return stream;
  // }

  // Initialize page
  useEffect(() => {
    loadModel();
    if (externalStream) {
      videoRef.current!.srcObject = externalStream;
      setInitiallzing(false);
      return;
    }
  }, []);

  const onFaceDetect = useCallback(async () => {
    const ctx = canvasRef.current!.getContext("2d");
    ctx!.drawImage(
      videoRef.current!,
      0,
      0,
      VIDEO_RESOLUTION_WIDTH,
      VIDEO_RESOLUTION_HEIGHT,
    );
    const data = canvasRef.current!.toDataURL("image/png");
    const start = performance.now();
    const res = await tryProcessFaceData(data);
    const end = performance.now();
    setTimeout(
      () => {
        if (res) {
          setIdentificationState(IdentificationState.SUCCESS);
          console.log("success")
        } else {
          setIdentificationState(IdentificationState.ERROR);
          console.log("error")
          setTimeout(() => {
            setIdentificationState(IdentificationState.POSITIONING);
          }, 4000);
        }
      },
      Math.max(0, 4000 - (end - start)),
    );
  }, []);

  // Interval For face detection
  useEffect(() => {
    const isFaceRecognitionNeeded =
      detectFace &&
      isPlaying &&
      identificationState === IdentificationState.POSITIONING;
    if (!isFaceRecognitionNeeded) return;

    const interval = setInterval(async () => {
      const detection = await faceapi.detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (detection) {
        if (isFaceInTheCenter(detection)) {
          // Emulate requests
          setIdentificationState(IdentificationState.PENDING);
          await onFaceDetect();
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [identificationState, isPlaying]);

  const handleReplay = useCallback(() => {
    setPlaying(true);
  }, []);

  const submitPhoto = useCallback(async () => {
    if (detectFace || identificationState != IdentificationState.POSITIONING)
      return;
    setIdentificationState(IdentificationState.PENDING);
    await onFaceDetect();
  }, [detectFace, identificationState]);

  return (
    <div className="flex h-max flex-col items-center justify-between">
      <div
        className="video-box-size relative flex items-center justify-center overflow-hidden"
        onClick={submitPhoto}
      >
        <div className="video-container relative flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            onPlay={handleReplay}
            className={
              "relative h-full w-full transform-gpu object-cover" +
              (detectFace ? " " + "-scale-x-100" : "")
            }
            autoPlay
            playsInline
            muted
          />
          <canvas
            className="absolute left-0 top-0 hidden h-px w-px"
            ref={canvasRef}
            width={VIDEO_RESOLUTION_WIDTH}
            height={VIDEO_RESOLUTION_HEIGHT}
          />
        </div>
        <div
          style={{
            background: overlayBackgroundFromState(identificationState),
            opacity: isInitializing ? 0 : 1,
            maskSize: "100% 100%",
            maskImage: detectFace
              ? "url(/assets/face-overlay.png)"
              : "url(/assets/photo-overlay.png)",
          }}
          className="video-box-size absolute left-0 top-0 z-10 transition-all duration-500 ease-in"
        ></div>
        <div
          style={{
            opacity:
              identificationState === IdentificationState.SUCCESS ? 1 : 0,
            maskSize: "100% 100%",
            maskImage: detectFace
              ? "url(/assets/face-overlay.png)"
              : "url(/assets/photo-overlay.png)",
          }}
          className={
            "video-box-size absolute left-0 top-0 z-10 bg-gradient-to-l from-[#64FF54] to-[#00DD89] transition-all duration-500 ease-in"
          }
        ></div>
      </div>
      <div className="ml-4 mr-4 pt-6 text-center text-lg font-bold text-white">
        {textForState(identificationState)
          .split("\n")
          .map((text) => (
            <p key={text}>{text}</p>
          ))}
      </div>
    </div>
  );
});

export default FaceDetector;
export { IdentificationState };
export type { FaceDetectorProps };
