import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import * as faceapi from "face-api.js";
import "./face-detector.css";
import {
  FaceDetectContext,
  TextForStateContext,
} from "../../context/MainContext";
import { useLocation } from "react-router-dom";

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
  cameraFacing?: "user" | "environment";
}

const FaceDetector = memo(function FaceDetector({
  tryProcessFaceData,
  textForState,
  externalStream,
  cameraFacing
}: FaceDetectorProps) {
  const [isInitializing, setInitiallzing] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [identificationState, setIdentificationState] =
    useState<IdentificationState>(IdentificationState.POSITIONING);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();
  if (textForState == null) textForState = defaultTextForState;
  if (textForState == undefined)
    textForState = useContext(TextForStateContext)!;
  if (tryProcessFaceData == null)
    tryProcessFaceData = useContext(FaceDetectContext)!;

  async function loadModel() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }

  // Kamera ishga tushirish
  async function startCamera(cameraFacing: "user" | "environment" = "user") {
    const constraints: MediaStreamConstraints = {
      video: {
        facingMode: { ideal: cameraFacing },
        width: { ideal: VIDEO_RESOLUTION_WIDTH },
        height: { ideal: VIDEO_RESOLUTION_HEIGHT },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    videoRef.current!.srcObject = stream;
    setInitiallzing(false);
    setPlaying(true);
  }

  // Kamera oqimini to'xtatish
  async function stopCamera() {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;

      stream.getTracks().forEach(track => track.stop());

      videoRef.current.srcObject = null;
    }
  }

  // Initialize page
  useEffect(() => {
    loadModel();
    if (externalStream) {
      videoRef.current!.srcObject = externalStream;
      setInitiallzing(false);
      return;
    } else {
      startCamera(cameraFacing); // Kamera ishga tushadi
    }

    return () => {
      stopCamera(); // Sahifa o'zgarganda yoki tark etilganda oqimni to'xtatish
    };
  }, [location.pathname]);

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
        } else {
          setIdentificationState(IdentificationState.ERROR);
          setTimeout(() => {
            setIdentificationState(IdentificationState.POSITIONING);
          }, 4000);
        }
      },
      Math.max(0, 4000 - (end - start)),
    );
  }, []);

  useEffect(() => {
    const isFaceRecognitionNeeded =
      isPlaying && identificationState === IdentificationState.POSITIONING;
    if (!isFaceRecognitionNeeded) return;

    const interval = setInterval(async () => {
      const detection = await faceapi.detectSingleFace(
        videoRef.current!,
        new faceapi.TinyFaceDetectorOptions(),
      );

      if (detection) {
        if (isFaceInTheCenter(detection)) {
          setIdentificationState(IdentificationState.PENDING);
          onFaceDetect();
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

  return (
    <div className="flex h-max flex-col items-center justify-between">
      <div className="video-box-size relative flex items-center justify-center overflow-hidden">
        <div className="video-container relative flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            onPlay={handleReplay}
            className="relative h-full w-full -scale-x-100 transform-gpu object-cover"
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
          }}
          className="video-box-size video-overlay-background-mask absolute left-0 top-0 z-10 transition-all duration-500 ease-in"
        ></div>
        <div
          style={{
            opacity:
              identificationState === IdentificationState.SUCCESS ? 1 : 0,
          }}
          className={
            "video-box-size video-overlay-background-mask absolute left-0 top-0 z-10 bg-gradient-to-l from-[#64FF54] to-[#00DD89] transition-all duration-500 ease-in"
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
