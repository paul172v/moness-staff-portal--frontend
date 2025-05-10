import { useNavigate } from "react-router-dom";

import classes from "./Home.module.scss";

import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

const Home = () => {
  const navigate = useNavigate();

  const goToSignUpHandler = () => {
    navigate("/sign-up");
  };

  const goToLogInHandler = () => {
    navigate("/log-in");
  };

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>STAFF PORTAL</h1>
      <div className="u-row">
        <ButtonStandard label="Log In" function={goToLogInHandler} />
        <ButtonStandard label="Sign Up" function={goToSignUpHandler} />
      </div>
    </div>
  );
};

export default Home;
