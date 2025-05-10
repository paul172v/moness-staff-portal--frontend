import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./EditUserPassword.module.scss";

import Loader from "../../../components/loader/Loader";
import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";
import { AlertInfoContext } from "../../../context/AlertInfoContext";

const EditUserPassword = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const { id } = useParams<{ id: string }>();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      AlertInfoCtx.setAlertInfoHandler(
        "Unauthorized",
        "Authentication token not found. Please log in again.",
        "Log In",
        "/log-in",
        "401"
      );
      navigate("/alert");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setValidationError("New password and Confirm New Password do not match.");
      return;
    }

    setValidationError("");

    try {
      setLoading(true);

      const response = await fetch(
        `${URL_ADDRESS}/employee/update-user-password/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Password update failed.");
      }

      navigate("/logged-in");
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Password Update Failed",
        error.message || "Something went wrong while updating your password.",
        "Back to Dashboard",
        "/logged-in",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Change Password</h1>

      {loading && <Loader />}

      {!loading && (
        <form onSubmit={handleSubmit} className={classes.form}>
          <label className={classes.label}>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={classes.input}
            required
          />

          <label className={classes.label}>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={classes.input}
            required
          />

          <label className={classes.label}>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className={classes.input}
            required
          />

          {validationError && (
            <p className={classes.error}>{validationError}</p>
          )}

          <div className={classes.actions}>
            <input
              type="submit"
              value="Update Password"
              className={classes.submit}
            />
            <ButtonStandard
              label="Cancel"
              function={() => navigate("/logged-in")}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserPassword;
