import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertInfoContext } from "../../../context/AlertInfoContext";
import URL_ADDRESS from "../../../dev/url";

import classes from "./ForgotPasswordChangePassword.module.scss";
import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

const ForgotPasswordChangePassword = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);
  const { token } = useParams<{ token: string }>(); // Extract token from URL

  console.log("Reset token:", token); // For debugging

  // Form state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Server response state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({
    missingFields: false,
    invalidPassword: false,
    passwordMismatch: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const goToLoginHandler = () => {
    navigate("/log-in");
  };

  const goToAlertHandler = () => {
    navigate("/alert");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        navigate("/log-in");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or expired reset link.");
      return;
    }

    // Client-side checks
    const missingFields = !newPassword.trim() || !confirmPassword.trim();
    const invalidPassword = newPassword.length < 6;
    const passwordMismatch = newPassword !== confirmPassword;

    setErrors({
      missingFields,
      invalidPassword,
      passwordMismatch,
    });

    if (!missingFields && !invalidPassword && !passwordMismatch) {
      setIsSubmitting(true);

      try {
        const response = await fetch(
          `${URL_ADDRESS}/employee/forgot-password/change-password`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              resetCode: String(token),
              password: newPassword,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to reset password");
        }

        AlertInfoCtx.setAlertInfoHandler(
          "Password changed!",
          "You have successfully changed your password.",
          "Go to Log In",
          "/log-in",
          ""
        );
        goToAlertHandler();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!token) {
    return (
      <div className={classes.container}>
        <p className={classes.error}>Invalid or expired reset link.</p>
        <ButtonStandard label="Back to Log In" function={goToLoginHandler} />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Change Password</h1>
      <p className={classes.instruction}>
        Please enter a new password for your account.
      </p>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={classes.input}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={classes.input}
        />

        {/* Client-side validation errors */}
        {errors.missingFields && (
          <p className={classes.error}>Please fill out all fields</p>
        )}
        {errors.invalidPassword && (
          <p className={classes.error}>
            Your new password must be at least 6 characters long
          </p>
        )}
        {errors.passwordMismatch && (
          <p className={classes.error}>Passwords do not match</p>
        )}

        {/* Server response messages */}
        {message && <p className={classes.success}>{message}</p>}
        {error && <p className={classes.error}>{error}</p>}

        <input
          className={classes["button-submit"]}
          type="submit"
          value={isSubmitting ? "Submitting..." : "Change Password"}
          disabled={isSubmitting}
        />
      </form>

      <div className={classes.links}>
        <ButtonStandard label="Back to Log In" function={goToLoginHandler} />
      </div>
    </div>
  );
};

export default ForgotPasswordChangePassword;
