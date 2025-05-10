import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Alert.module.scss";
import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";

// 1. Import your context
import { AlertInfoContext } from "../../context/AlertInfoContext";

const Alert: React.FC = () => {
  const navigate = useNavigate();

  // 2. Get the alert info from context
  const { alertInfo } = useContext(AlertInfoContext);
  const { heading, message, buttonLabel, linkURL, errorCode } = alertInfo;

  const goToURL = () => {
    // 3. Use linkURL from context to navigate
    navigate(linkURL);
  };

  return (
    <div className={classes.container}>
      {errorCode && <div className={classes.errorCode}>{errorCode}</div>}
      {heading && <h2 className={classes.heading}>{heading}</h2>}
      <div className={classes.message}>{message}</div>
      <ButtonStandard label={buttonLabel} function={goToURL} />
    </div>
  );
};

export default Alert;
