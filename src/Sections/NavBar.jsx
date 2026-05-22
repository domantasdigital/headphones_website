import { useState } from "react";

import {
  UserIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const links = [
  "Cart",
  "Search",
  "Headphones & Headsets",
  "Microphones",
  "Manufaktur",
  "Studio",
  "Gaming",
  "Outlet",
  "Blog",
];

const NavBar = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  return (
    <div className=" fixed top-0 left-0 w-full z-50 bg-grey-100 px-4 xl:px-0">
      <nav className="w-full py-5  flex flex-center justify-between relative max-w-7xl mx-auto ">
        <div className="max-w-48 max-y-5.5 ">
          <a href="#">
            <img
              src="/Assets/Beyerdynamic_2025_logo.svg"
              alt="Beyerdynamic Logo"
            />
          </a>
        </div>
        <div className="hidden xl:flex flex-center justify-between gap-7.5">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className=" hover:text-orange-500 transition-colors duration-300
            relative uppercase after:absolute after:-bottom-1 after:left-0 after:rounded-full after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full "
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex flex-center justify-between gap-4">
          <a
            href="#"
            className="hidden xl:block relative uppercase after:absolute after:-bottom-1 after:left-0 after:rounded-full after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full "
          >
            <UserIcon className="size-5 text-grey-900 hover:text-orange-500 transition-colors duration-300" />
          </a>
          <a
            href="#"
            className="hidden md:block relative uppercase after:absolute after:-bottom-1 after:left-0 after:rounded-full after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full "
          >
            <MagnifyingGlassIcon className="size-5 text-grey-900 hover:text-orange-500 transition-colors duration-300" />
          </a>
          <a
            href="#"
            className="hidden md:block  
            relative uppercase after:absolute after:-bottom-1 after:left-0 after:rounded-full after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full "
          >
            <ShoppingCartIcon className="size-5 text-grey-900 hover:text-orange-500 transition-colors duration-300" />
          </a>
          <button
            onClick={() => setNavIsOpen(!navIsOpen)}
            className="relative xl:hidden size-5 cursor-pointer"
          >
            <Bars3Icon
              className={`absolute inset-0 text-grey-900 transition-all duration-300 ${navIsOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
            />
            <XMarkIcon
              className={`absolute inset-0 text-grey-900 transition-all duration-300 ${navIsOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
            />
          </button>
        </div>
      </nav>

      {/* Dropdown lives here, inside the fixed wrapper */}
      <div
        className={`xl:hidden transition-all duration-500 ease-in-out overflow-hidden
          ${navIsOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col items-center gap-1 py-5">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="px-6 py-3 uppercase text-sm hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-center"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
