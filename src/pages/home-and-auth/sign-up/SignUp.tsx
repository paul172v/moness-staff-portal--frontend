import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.scss";
import URL_ADDRESS from "../../../dev/url";

import { AlertInfoContext } from "../../../context/AlertInfoContext";
import { ShowHeaderSettingsContext } from "../../../context/ShowHeader";

import Loader from "../../../components/loader/Loader";
import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  emailMatch: boolean;
  invalidEmail: boolean;
  passwordMatch: boolean;
  invalidPassword: boolean;
  missingFields: boolean;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);
  const showHeaderSettingsCtx = useContext(ShowHeaderSettingsContext);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    emailMatch: false,
    invalidEmail: false,
    passwordMatch: false,
    invalidPassword: false,
    missingFields: false,
  });

  const goToHomeHandler = () => {
    navigate("/");
  };

  const goToAlertHandler = () => {
    navigate("/alert");
  };

  const goToLoggedInHandler = () => {
    navigate("logged-in");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any fields are empty
    const missingFields = Object.values(formData).some(
      (value) => value.trim().length === 0
    );

    // Validate form inputs
    const emailMismatch = formData.email !== formData.confirmEmail;
    const invalidEmail = !formData.email.includes("@");
    const passwordMismatch = formData.password !== formData.confirmPassword;
    const invalidPassword = formData.password.length < 6;

    setErrors({
      emailMatch: emailMismatch,
      invalidEmail,
      passwordMatch: passwordMismatch,
      invalidPassword,
      missingFields,
    });

    // If there are errors, prevent submission
    if (
      missingFields ||
      emailMismatch ||
      invalidEmail ||
      passwordMismatch ||
      invalidPassword
    ) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${URL_ADDRESS}/employee/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      document.cookie = `auth_token=${data.token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; Secure; SameSite=Strict`;

      showHeaderSettingsCtx.setSettingsHandler(true, data.role);

      AlertInfoCtx.setAlertInfoHandler(
        "Sign up successful!",
        "Employee account created",
        "Go to Main",
        "/logged-in",
        ""
      );
      goToAlertHandler();
    } catch (error: any) {
      document.cookie = "";

      if (
        error?.message ===
        "A single email address can only be tied to one account"
      ) {
        AlertInfoCtx.setAlertInfoHandler(
          "Email already taken!",
          "An account has already been registered to this email address",
          "Go to Sign Up",
          "/sign-up",
          "409"
        );
        goToAlertHandler();
      } else {
        AlertInfoCtx.setAlertInfoHandler(
          "Something went wrong!",
          "There was an unexpected error. Please try again.",
          "Go to Sign Up",
          "/sign-up",
          "500"
        );
      }

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
          <h1 className={classes.title}>Sign Up</h1>

          <form onSubmit={handleSubmit} className={classes.form}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="confirmEmail"
              placeholder="Confirm Email"
              value={formData.confirmEmail}
              onChange={handleChange}
              required
            />

            {errors.emailMatch && (
              <p className={classes.error}>Emails do not match.</p>
            )}
            {errors.invalidEmail && (
              <p className={classes.error}>
                Please enter a valid email address.
              </p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {errors.passwordMatch && (
              <p className={classes.error}>Passwords do not match.</p>
            )}
            {errors.invalidPassword && (
              <p className={classes.error}>
                Password must be at least 6 characters long.
              </p>
            )}
            {errors.missingFields && (
              <p className={classes.error}>Please fill out all fields.</p>
            )}

            <input
              className={classes["button-submit"]}
              type="submit"
              value="Submit"
            />
          </form>

          <ButtonStandard label="Back to Home" function={goToHomeHandler} />
        </>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default SignUp;
