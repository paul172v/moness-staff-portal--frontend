import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../../dev/url";

import classes from "./ConfirmDeleteEmployee.module.scss";

import Loader from "../../../../components/loader/Loader";
import ButtonStandard from "../../../../components/buttons/button-standard/ButtonStandard";
import { AlertInfoContext } from "../../../../context/AlertInfoContext";

interface Employee {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
}

const ConfirmDeleteEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const fetchEmployee = async () => {
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
        throw new Error(data.message || "Failed to fetch employee.");
      }
      setEmployee(data.payload); // ✅ Corrected line
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Error Fetching Employee",
        error.message || "Something went wrong while loading employee details.",
        "Back to Dashboard",
        "/logged-in",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!token || !id) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${URL_ADDRESS}/employee/delete-employee/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Failed to delete employee.");
      }

      AlertInfoCtx.setAlertInfoHandler(
        "Employee Deleted",
        "Employee has been successfully deleted",
        "View Employee Access List",
        "/manager/employee-access-levels/view-employee-access-levels"
      );
      navigate("/alert");
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Employee Deleted",
        "Employee has been successfully deleted",
        "View Employee Access List",
        "/manager/employee-access-levels/view-employee-access-levels"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !employee) {
    return (
      <div className={classes.container}>
        <Loader />
      </div>
    );
  }

  const fullName = `${employee.firstName} ${
    employee.middleName ? employee.middleName + " " : ""
  }${employee.lastName}`;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Confirm Deletion</h1>
      <p className={classes.info}>
        Are you sure you want to delete this employee?
      </p>
      <div className={classes.employee}>
        <p className={classes.detail}>
          <strong>Name:</strong> {fullName}
        </p>
        <p className={classes.detail}>
          <strong>Email:</strong> {employee.email}
        </p>
        <p className={classes.detail}>
          <strong>Role:</strong> {employee.role}
        </p>
      </div>

      <div className={classes.actions}>
        <ButtonStandard label="Confirm Delete" function={handleDelete} />
        <ButtonStandard
          label="Cancel"
          function={() =>
            navigate(
              "/manager/employee-access-levels/view-employee-access-levels"
            )
          }
        />
      </div>
    </div>
  );
};

export default ConfirmDeleteEmployee;
