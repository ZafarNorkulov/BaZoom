import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import NavMenu from "../nav-menu/NavMenu";



function PageLayout() {




 
  const location = useLocation();
  const hasboost = location.pathname.includes("/boosts") || location.pathname.includes("/history");

  return  (
    <div className="w-screen overflow-y-scroll overflow-x-hidden scroll-smooth pb-[24vw] font-sans text-gray">


      {!hasboost ? <Header /> : null}
      <Outlet />
      <NavMenu />
    </div>
  );
}

export default PageLayout;