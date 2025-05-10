import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../../dev/url";

import classes from "./ViewEmployeeAccessLevels.module.scss";

import { AlertInfoContext } from "../../../../context/AlertInfoContext";
import Loader from "../../../../components/loader/Loader";
import ButtonStandard from "../../../../components/buttons/button-standard/ButtonStandard";

interface Employee {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  role: string;
}

const ViewEmployeeAccessLevels = () => {
  const navigate = useNavigate();
  const AlertInfoCtx = useContext(AlertInfoContext);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "All" | "Allowed" | "Pending" | "Banned" | "Manager"
  >("All");

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const fetchEmployees = async () => {
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
        `${URL_ADDRESS}/employee/get-employees-access-list`,
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
        throw new Error(data.message || "Failed to fetch employee data.");
      }

      const employeeList = data.payload?.employees;

      if (!Array.isArray(employeeList)) {
        throw new Error("Unexpected response format.");
      }

      setEmployees(employeeList);
    } catch (error: any) {
      AlertInfoCtx.setAlertInfoHandler(
        "Error Fetching Employees",
        error.message || "Something went wrong while fetching employee data.",
        "Back to Home",
        "/",
        "500"
      );
      navigate("/alert");
    } finally {
      setLoading(false);
    }
  };

  const filterEmployees = (): Employee[] => {
    if (!employees || !Array.isArray(employees)) return [];
    if (filter === "All") return employees;
    return employees.filter(
      (emp) => emp.role.toLowerCase() === filter.toLowerCase()
    );
  };

  const goToLoggedInHandler = () => {
    navigate("/logged-in");
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Manage Employee Access</h1>

      {loading && <Loader />}

      {!loading && (
        <>
          <div className={classes.filters}>
            <ButtonStandard label="All" function={() => setFilter("All")} />
            <ButtonStandard
              label="Manager"
              function={() => setFilter("Manager")}
            />
            <ButtonStandard
              label="Allowed"
              function={() => setFilter("Allowed")}
            />
            <ButtonStandard
              label="Pending"
              function={() => setFilter("Pending")}
            />
            <ButtonStandard
              label="Banned"
              function={() => setFilter("Banned")}
            />
          </div>

          <div className={classes.list}>
            {filterEmployees().map((emp) => (
              <div key={emp._id} className={classes.card}>
                <p className={classes.name}>
                  {emp.firstName} {emp.middleName ? `${emp.middleName} ` : ""}
                  {emp.lastName}
                </p>
                <p className={classes.email}>{emp.email}</p>
                <p className={classes.role}>
                  <span className={classes[emp.role.toLowerCase()]}>
                    {emp.role}
                  </span>
                </p>
                <div className={classes.actions}>
                  <ButtonStandard
                    label="Edit"
                    function={() =>
                      navigate(
                        `/manager/employee-access-levels/edit-employee-access-level/${emp._id}`
                      )
                    }
                  />
                  <ButtonStandard
                    label="Delete"
                    function={() =>
                      navigate(
                        `/manager/employee-access-levels/confirm-delete-employee/${emp._id}`
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {filterEmployees().length === 0 && (
            <p className={classes.message}>
              No employees found for this category.
            </p>
          )}

          <ButtonStandard label="Close" function={goToLoggedInHandler} />
        </>
      )}
    </div>
  );
};

export default ViewEmployeeAccessLevels;
