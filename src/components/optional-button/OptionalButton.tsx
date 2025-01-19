interface OptioanalButtonProps {
  active?: boolean;
  className?: string;
  text: string;
  onClick: () => void;
}

function OptionalButton({
  active,
  text,
  onClick,
  className,
}: OptioanalButtonProps) {
  return active ? (
    <button
      className={
        "taxi-gradient flex items-center justify-center rounded-[10px] p-4 pb-2 pt-2 text-center text-sm text-white" +
          " " +
          className || ""
      }
      onClick={onClick}
    >
      <p className="m-auto h-full text-center">{text}</p>
    </button>
  ) : (
    <button
      className={
        "flex items-center justify-center rounded-[10px] border border-darkgray p-4 pb-2 pt-2 text-center text-sm text-white" +
          " " +
          className || ""
      }
    >
      <p className="m-auto h-full text-center">{text}</p>
    </button>
  );
}

export default OptionalButton;
