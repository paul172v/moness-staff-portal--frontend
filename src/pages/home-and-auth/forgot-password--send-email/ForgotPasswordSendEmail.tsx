import { useNavigate } from "react-router-dom";
import { useState } from "react";
import URL_ADDRESS from "../../../dev/url";

import classes from "./ForgotPasswordSendEmail.module.scss";

import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

const ForgotPasswordSendEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // We'll store some simple validation flags in a separate state
  const [errors, setErrors] = useState({
    missingEmail: false,
    invalidEmail: false,
  });

  const goToLoginHandler = () => {
    navigate("/log-in");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset success and error messages
    setMessage("");
    setError("");

    // Basic client-side validations
    const missingEmail = email.trim().length === 0;
    const invalidEmail = !email.includes("@");

    setErrors({ missingEmail, invalidEmail });

    if (!missingEmail && !invalidEmail) {
      // If everything is valid, proceed with sending the reset link
      try {
        const response = await fetch(
          `${URL_ADDRESS}/employee/forgot-password/send-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          // If the server responds with an error, we display it
          throw new Error(data.message || "Failed to send reset link");
        }

        setMessage("Password reset link sent to your email.");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Forgot Password</h1>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />

        {/* Client-side error messages */}
        {errors.missingEmail && (
          <p className={classes.error}>Please enter your email</p>
        )}
        {errors.invalidEmail && (
          <p className={classes.error}>Please enter a valid email address</p>
        )}

        {/* Server response messages */}
        {message && <p className={classes.success}>{message}</p>}
        {error && <p className={classes.error}>{error}</p>}

        <input
          className={classes["button-submit"]}
          type="submit"
          value="Send Reset Link"
        />
      </form>
      <div className={classes.links}>
        <ButtonStandard label="Back to Log In" function={goToLoginHandler} />
      </div>
    </div>
  );
};

export default ForgotPasswordSendEmail;
