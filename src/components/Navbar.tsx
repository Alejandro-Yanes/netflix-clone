import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, [setShowMobileMenu]);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
    console.log("runned");
  }, [setShowAccountMenu]);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}
      >
        <img src="/images/logo.png" alt="netflix logo" className="h-4 lg:h-7" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div className="lg:hidden  ml-8 cursor-pointer relative">
          <button
            onClick={() => toggleMobileMenu()}
            className="flex flex-row items-center gap-2"
          >
            <p className="text-white text-sm">Browse</p>
            <BsChevronDown
              className={`text-white transition ${
                showMobileMenu ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
            <BsBell />
          </div>
          <div className=" cursor-pointer relative">
            <button
              onClick={() => toggleAccountMenu()}
              className="flex flex-row gap-3 items-center"
            >
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <img src="images/default-slate.png" alt="" />
              </div>
              <BsChevronDown
                className={`text-white transition ${
                  showAccountMenu ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
