import "./loading-screen.css";

interface LoadingScreenProps {
  progress?: number;
}

function LoadingScreen({ progress = 80 }: LoadingScreenProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between text-center tracking-[0.01em] text-gray">
      <div className="mt-[35vh]">
        <p className="text-4xl font-bold">BaZoom</p>
        <p className="text-[30px] font-normal">Game Mining</p>
      </div>

      <div className="mb-[20vh] h-[39px] w-4/5 rounded-[16px] bg-deepgray p-1">
        <div 
          className="taxi-gradient h-full rounded-xl transition-all duration-1000 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
