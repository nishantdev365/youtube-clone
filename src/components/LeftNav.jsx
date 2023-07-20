import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu, theme, setTheme } =
    useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black md:bg-white dark:bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      <div className="md:hidden flex justify-center mb-2">
        <div
          onClick={handleThemeSwitch}
          className="bg-[#c5e0fb] flex items-center py-1 px-5 rounded-md cursor-pointer hover:bg-[#9dcaf7]"
        >
          {theme === "dark" ? (
            <>
              Light Mode <MdOutlineLightMode className="pl-1 text-xl" />
            </>
          ) : (
            <>
              Dark Mode <MdDarkMode className="pl-1 text-xl text-[#3a5171]" />
            </>
          )}
        </div>
      </div>

      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                    selectedCategory === item.name
                    ? "bg-white/[0.15] md:bg-black/[0.15] dark:bg-white/[0.15]"
                    : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2] md:border-black/[0.2] border dark:border dark:border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
       <hr className="my-5 border-white/[0.2] md:border-black/[0.2] border dark:border dark:border-white/[0.2]" />
        <div className="text-white/[0.5] md:text-black/[0.7] dark:text-white/[0.5] text-[12px]">
          Developed by: Nishant kumar
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
