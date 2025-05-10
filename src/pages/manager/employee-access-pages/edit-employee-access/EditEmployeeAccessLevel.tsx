import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../../dev/url";

import classes from "./EditEmployeeAccessLevel.module.scss";

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

const EditEmployeesAccessLevel = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const roleRef = useRef<HTMLSelectElement>(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const fetchEmployeeDetails = async () => {
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

      console.log(data);

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Failed to fetch employee data.");
      }

      const emp = data.payload;

      if (!emp || typeof emp !== "object") {
        throw new Error("Unexpected response format.");
      }

      setEmployee(emp);
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Error Fetching Employee",
        error.message ||
          "Something went wrong while fetching employee details.",
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

    if (!token || !employee) return;

    const newRole = roleRef.current?.value;
    if (!newRole) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${URL_ADDRESS}/employee/update-employee-access`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: employee._id,
            role: newRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status === "fail") {
        throw new Error(data.message || "Update failed");
      }

      navigate("/manager/employee-access-levels/view-employee-access-levels");
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Update Failed",
        error.message || "Something went wrong updating employee access.",
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
    fetchEmployeeDetails();
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
      <h1 className={classes.title}>Edit Access Level</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <p className={classes.label}>
          <strong>Name:</strong> {fullName}
          <br />
          <strong>Email:</strong> {employee.email}
        </p>

        <label className={classes.label} htmlFor="role">
          New Role:
        </label>
        <select
          id="role"
          ref={roleRef}
          defaultValue={employee.role}
          className={classes.select}
        >
          <option value="Manager">Manager</option>
          <option value="Allowed">Allowed</option>
          <option value="Pending">Pending</option>
          <option value="Banned">Banned</option>
        </select>

        <div className={classes.actions}>
          <input
            type="submit"
            value="Confirm Change"
            className={classes.submit}
          />
          <ButtonStandard
            label="Cancel"
            function={() =>
              navigate(
                "/manager/employee-access-levels/view-employee-access-levels"
              )
            }
          />
        </div>
      </form>
    </div>
  );
};

export default EditEmployeesAccessLevel;
