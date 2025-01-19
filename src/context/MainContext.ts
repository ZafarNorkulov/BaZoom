import { createContext } from "react";
import { IdentificationState } from "../components/face-detector/FaceDetector";

const FaceDetectContext = createContext<
  ((photo: string) => Promise<boolean>) | undefined
>(undefined);
const TextForStateContext = createContext<
  ((state: IdentificationState) => string) | undefined
>(undefined);

export { FaceDetectContext, TextForStateContext };
