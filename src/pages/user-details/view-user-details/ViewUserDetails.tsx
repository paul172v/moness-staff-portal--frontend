import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./ViewUserDetails.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";
import Loader from "../../../components/loader/Loader";
import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
}

const ViewUserDetails = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  console.log("Token received:", token);

  const fetchUserDetails = async () => {
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

    try {
      setLoading(true);
      const response = await fetch(
        `${URL_ADDRESS}/employee/get-user-details-by-id`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Failed to fetch user details.");
      }

      setUserDetails(data.payload);
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Error Fetching Details",
        error.message || "Something went wrong.",
        "Back to Home",
        "/",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  const fullName = () => {
    if (!userDetails) return "";
    const { firstName, middleName, lastName } = userDetails;
    return `${firstName} ${middleName ? middleName + " " : ""}${lastName}`;
  };

  const goToEditUserDetails = () => {
    if (!userDetails) return "";
    const { id } = userDetails;
    navigate(`/user-details/edit-user-details/${id}`);
  };

  const goToEditUserPassword = () => {
    if (!userDetails) return "";
    const { id } = userDetails;
    navigate(`/user-details/edit-user-password/${id}`);
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Your Profile</h1>

      {loading && <Loader />}

      {!loading && userDetails && (
        <div className={classes.card}>
          <p className={classes.name}>{fullName()}</p>
          <p className={classes.email}>{userDetails.email}</p>
          <p className={classes.role}>
            <span className={classes[userDetails.role.toLowerCase()]}>
              {userDetails.role}
            </span>
          </p>

          <div className={classes.actions}>
            <ButtonStandard
              label="Edit Details"
              function={goToEditUserDetails}
            />
            <ButtonStandard
              label="Change Password"
              function={goToEditUserPassword}
            />
            <ButtonStandard
              label="Close"
              function={() => navigate("/logged-in")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserDetails;
