import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./EditUserDetails.module.scss";

import Loader from "../../../components/loader/Loader";
import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";
import { AlertInfoContext } from "../../../context/AlertInfoContext";

interface UserDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
}

const EditUserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const goToLoggedInHandler = () => {
    navigate("/logged-in");
  };

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
        `${URL_ADDRESS}/employee/get-employee-by-id/${id}`,
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

      setUser(data.payload);
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Error Fetching Details",
        error.message || "Something went wrong.",
        "Back to Dashboard",
        "/logged-in",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !user || !id) return;

    const updatedFields = {
      firstName: firstNameRef.current?.value,
      middleName: middleNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${URL_ADDRESS}/employee/update-user/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Update failed");
      }

      navigate("/logged-in");
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Update Failed",
        error.message || "Something went wrong while updating your details.",
        "Back to Dashboard",
        "/logged-in",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !user) {
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Update User Details</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <label className={classes.label}>First Name:</label>
        <input
          type="text"
          defaultValue={user.firstName}
          ref={firstNameRef}
          className={classes.input}
        />

        <label className={classes.label}>Middle Name:</label>
        <input
          type="text"
          defaultValue={user.middleName || ""}
          ref={middleNameRef}
          className={classes.input}
        />

        <label className={classes.label}>Last Name:</label>
        <input
          type="text"
          defaultValue={user.lastName}
          ref={lastNameRef}
          className={classes.input}
        />

        <label className={classes.label}>Email:</label>
        <input
          type="email"
          defaultValue={user.email}
          ref={emailRef}
          className={classes.input}
        />

        <div className={classes.actions}>
          <input
            type="submit"
            value="Save Changes"
            className={classes.submit}
          />
          <ButtonStandard label="Cancel" function={goToLoggedInHandler} />
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
