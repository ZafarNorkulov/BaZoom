import { useTranslation } from "react-i18next";
import questPurple from "../../assets/question-purple.png";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const QuestionModal = ({
  open,
  setOpen,
  title,
  text,
  url,
  icon,
  buttonText
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string;
  text: string;
  url: string;
  icon?: string;
  buttonText?: string
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setOpen(false); // Close modal when clicking outside
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  return (
    <div
      className={`${open ? "flex" : "hidden"} bg-[#000] bg-opacity-50 fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden px-[37px] z-10`}
    >
      <div
        ref={modalRef}
        className={`${open ? "modal-animation" : "scale-0"} content flex w-full flex-col items-center rounded-2xl bg-[#19191A] px-4 py-5`}
      >
        <img src={icon ? icon : questPurple} className="h-[55px] w-[55px]" />
        <div className="mt-4 flex flex-col gap-2">
          <h3 className="text-center text-base font-black leading-5 tracking-[0.005em] text-white">
            {title}
          </h3>
          <p className="text-center text-xs tracking-[0.01em] text-gray">
            {text}
          </p>
        </div>
        <Link
          to={url}
          className="mt-7 w-full rounded-xl bg-purple py-3 text-center text-xs font-semibold leading-[14.5px] text-white"
        >
          {buttonText ? buttonText : t("components.questionModal.button")}
        </Link>
      </div>
    </div>
  );
};

export default QuestionModal;
