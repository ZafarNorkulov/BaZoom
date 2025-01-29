import { useNavigate } from "react-router-dom";
import leftArrow from "../../assets/left-button.png";
import i18next from "i18next";

const BackPage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4 px-[11px]">
        <img src={leftArrow} className="h-5 w-5" onClick={() => navigate(-1)} />
        <h4 className="text-center text-sm leading-4 text-white font-extrabold">{i18next.t(title)}</h4>
        <div className="h-5 w-5" />
      </div>
      <div className="w-full h-[0.5px]  bg-darkgray" />
    </div>
  );
};

export default BackPage;
