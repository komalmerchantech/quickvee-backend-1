import { Outlet } from "react-router-dom";
// import { SideMenu } from "./SideMenu";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Header from "./Header";
import LeftSide from "./LeftSide";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <>
    <div className="bg-[#F9F9F9]">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div>
        <SideMenu isMenuOpen={isMenuOpen}  />
        <div
          className="main-content"
          style={{ paddingLeft: isMenuOpen ? "16rem" : "6rem" }}
        >
          <Outlet />
          <LeftSide />
        </div>
      </div>
      </div>
    </>
  );
};
