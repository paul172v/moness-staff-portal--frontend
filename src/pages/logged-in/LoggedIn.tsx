import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./LoggedIn.module.scss";

import { ShowHeaderSettingsContext } from "../../context/ShowHeader";

import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";

const LoggedIn = () => {
  const navigate = useNavigate();
  const showHeaderSettingsCtx = useContext(ShowHeaderSettingsContext);

  const logoutHandler = () => {
    // Handle logout logic (e.g., clear auth tokens, session storage, etc.)
    document.cookie = `auth_token=""; path=/; max-age=${60}; Secure; SameSite=Strict`;
    showHeaderSettingsCtx.setSettingsHandler(false, "Pending");
    navigate("/");
  };

  const goToTableReservationHandler = () => {
    navigate("/table-reservation-overview");
  };

  const goToFlemmyngMenuHandler = () => {
    navigate("/flemmyng-menu-overview");
  };

  if (
    showHeaderSettingsCtx.settings.role === "Manager" ||
    showHeaderSettingsCtx.settings.role === "Allowed"
  )
    return (
      <div className={classes.container}>
        <img
          className={classes.logo}
          src="/moness-logo.jpg"
          alt="Moness Logo"
        />
        <h1 className={classes.title}>Welcome to the Staff Portal</h1>
        <p className={classes.message}>You are successfully logged in.</p>
        <ButtonStandard
          label="Table Reservation"
          function={goToTableReservationHandler}
        />
        <ButtonStandard
          label="Flemmyng Menu"
          function={goToFlemmyngMenuHandler}
        />
      </div>
    );

  if (showHeaderSettingsCtx.settings.role === "Pending")
    return (
      <div className={classes.container}>
        <img
          className={classes.logo}
          src="/moness-logo.jpg"
          alt="Moness Logo"
        />
        <h1 className={classes.title}>Welcome to the Staff Portal</h1>
        <p className={classes.message}>
          Your account is currently "Pending" and will need to be approved by a
          manager before you can access this app.
        </p>
        <ButtonStandard label="Log Out" function={logoutHandler} />
      </div>
    );

  if (showHeaderSettingsCtx.settings.role === "Banned")
    return (
      <div className={classes.container}>
        <img
          className={classes.logo}
          src="/moness-logo.jpg"
          alt="Moness Logo"
        />
        <h1 className={classes.title}>Welcome to the Staff Portal</h1>
        <p className={classes.message}>
          Your account is banned and you will not be allowed access to this app.
        </p>
        <ButtonStandard label="Log Out" function={logoutHandler} />
      </div>
    );
};

export default LoggedIn;
