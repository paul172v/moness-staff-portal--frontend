import { useNavigate } from "react-router-dom";

import classes from "./Unauthorized.module.scss";

import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goToHomeHandler = () => {
    navigate("/");
  };

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Access Denied</h1>
      <p className={classes.message}>
        You do not have permission to view this page.
      </p>
      <ButtonStandard label="Back to Home" function={goToHomeHandler} />
    </div>
  );
};

export default Unauthorized;
