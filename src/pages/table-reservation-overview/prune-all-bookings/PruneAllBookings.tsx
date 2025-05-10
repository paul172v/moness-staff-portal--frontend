import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./PruneAllBookings.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

const PruneAllBookings = () => {
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL_ADDRESS}/table/prune/prune-all`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Prune Failed!",
          "An error occurred while deleting old bookings.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "502"
        );
        return navigate("/alert");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Prune Successful!",
        `${data.deletedTableBookings} bookings and ${data.deletedBlockedTables} blocked slots were deleted.`,
        "Return to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Prune Failed!",
        "An unexpected error occurred while pruning bookings.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const handleCancel = () => {
    navigate("/table-reservation-overview");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Prune Old Bookings</h1>
      <p className={classes.warning}>
        This will permanently delete all bookings and blocked slots before
        today's date. Are you sure you want to continue?
      </p>

      <div className={classes.buttonGroup}>
        <button onClick={handleDelete} className={classes.confirmButton}>
          Yes, Delete All Old Bookings
        </button>
        <button onClick={handleCancel} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PruneAllBookings;
