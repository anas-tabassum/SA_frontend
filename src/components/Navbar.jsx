import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  console.log();
  return (
    <div className={`${location.pathname === "/" ? "hidden" : ""}`}>
      <Navbar fluid rounded className="bg-gray-100 py-6 px-4">
        <div className="container mx-auto flex justify-center items-center p-4">
          {/* <Navbar.Toggle className="md:order-2" /> */}
          <Navbar.Collapse className="flex justify-center md:order-1">
            <div className="px-4">
              <NavLink to="/add" className="text-base">
                Add
              </NavLink>
            </div>
            <div className="px-4">
              <NavLink to="/products" className="text-base">
                Products
              </NavLink>
            </div>
            <div className="px-4">
              <NavLink to="/logout" className="text-base">
                Logout
              </NavLink>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
