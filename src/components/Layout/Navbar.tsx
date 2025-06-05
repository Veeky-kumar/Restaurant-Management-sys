import React from "react";

interface NavbarProps {
  title?: string;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, toggleSidebar }) => {
  return (
    <div>
      <div className="topbar flex justify-end lg:flex-row-reverse items-center w-full relative">
        <div className="flex-grow text-center">
          <h1
            className="head_panel_14 sm:translate-x-0"
            id="heading_PageTitle_RestaurantLayout"
          >
            {title}
          </h1>
        </div>
        <div className="absolut  px-3">
          <button
            className="navbar-toggler p-0 bg-transparent"
            type="button"
            data-bs-toggle="minimize"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <i
              className="fa fa-bars"
              aria-hidden="true"
              style={{ color: "#66bd50", fontSize: "1.5rem" }}
            ></i>
          </button>
        </div>
      </div>

      <nav className="p-4"></nav>
    </div>
  );
};

export default Navbar;
