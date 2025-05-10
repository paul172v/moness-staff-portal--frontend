import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./LogIn.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";
import { ShowHeaderSettingsContext } from "../../../context/ShowHeader";

import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";
import Loader from "../../../components/loader/Loader";

const LogIn = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);
  const showHeaderSettingsCtx = useContext(ShowHeaderSettingsContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    missingFields: false,
    invalidEmail: false,
    invalidPassword: false,
  });

  const goToHomeHandler = () => {
    navigate("/");
  };

  const goToForgotPasswordSendEmailHandler = () => {
    navigate("/forgot-password/send-email");
  };

  const goToAlertHandler = () => {
    navigate("/alert");
  };

  const goToLoggedInHandler = () => {
    navigate("/logged-in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFields =
      email.trim().length === 0 || password.trim().length === 0;
    const invalidEmail = !email.includes("@");
    const invalidPassword = password.length < 6;

    setErrors({
      missingFields,
      invalidEmail,
      invalidPassword,
    });

    if (missingFields || invalidEmail || invalidPassword) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${URL_ADDRESS}/employee/log-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      document.cookie = `auth_token=${data.token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; Secure; SameSite=Strict`;

      showHeaderSettingsCtx.setSettingsHandler(true, data.role);

      goToLoggedInHandler();
    } catch (error: any) {
      document.cookie = "";

      AlertInfoCtx.setAlertInfoHandler(
        "Login failed!",
        error?.message || "Invalid credentials. Please try again.",
        "Go to Log In",
        "/log-in",
        "401"
      );
      goToAlertHandler();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      {!isLoading && (
        <>
          <img
            className={classes.logo}
            src="/moness-logo.jpg"
            alt="Moness Logo"
          />
          <h1 className={classes.title}>Log In</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={classes.input}
            />

            {errors.missingFields && (
              <p className={classes.error}>Please fill out all fields</p>
            )}
            {errors.invalidEmail && (
              <p className={classes.error}>
                Please enter a valid email address
              </p>
            )}
            {errors.invalidPassword && (
              <p className={classes.error}>
                Password must be at least 6 characters long
              </p>
            )}

            <input
              className={classes["button-submit"]}
              type="submit"
              value="Submit"
            />
          </form>
          <div className={classes.links}>
            <ButtonStandard
              label="Forgot Password"
              function={goToForgotPasswordSendEmailHandler}
            />
            <ButtonStandard label="Back to Home" function={goToHomeHandler} />
          </div>
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default LogIn;
