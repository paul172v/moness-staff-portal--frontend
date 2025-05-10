import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShowHeaderSettingsContext } from "../../context/ShowHeader";

import classes from "./Header.module.scss";

import ButtonStandard from "../buttons/button-standard/ButtonStandard";
import { Menu, X } from "lucide-react"; // You can install lucide-react or use any icon lib

const Header = () => {
  const navigate = useNavigate();
  const showHeaderSettingsCtx = useContext(ShowHeaderSettingsContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const goToEmployeeAccessLevels = () => {
    navigate("/manager/employee-access-levels/view-employee-access-levels");
    setMenuOpen(false);
  };

  const goToViewUserDetails = () => {
    navigate("/user-details/view-user-details");
    setMenuOpen(false);
  };

  const logOutHandler = () => {
    document.cookie = `auth_token=''`;
    showHeaderSettingsCtx.setSettingsHandler(false, "Pending");
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className={classes.header}>
      <div className={classes.left}>
        {/* Only show this on desktop */}
        <div className={classes.desktopOnly}>
          {showHeaderSettingsCtx.settings.role === "Manager" && (
            <ButtonStandard
              label="Employee Access Levels"
              function={goToEmployeeAccessLevels}
            />
          )}
        </div>
      </div>

      <div className={classes.right}>
        <div className={classes.desktopButtons}>
          <ButtonStandard label="User Details" function={goToViewUserDetails} />
          <ButtonStandard label="Log Out" function={logOutHandler} />
        </div>

        <div className={classes.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {menuOpen && (
          <div className={classes.dropdown}>
            {showHeaderSettingsCtx.settings.role === "Manager" && (
              <ButtonStandard
                label="Employee Access Levels"
                function={goToEmployeeAccessLevels}
              />
            )}
            <ButtonStandard
              label="User Details"
              function={goToViewUserDetails}
            />
            <ButtonStandard label="Log Out" function={logOutHandler} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
