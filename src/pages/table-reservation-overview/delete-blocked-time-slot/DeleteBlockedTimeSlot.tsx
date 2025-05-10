import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./DeleteBlockedTimeSlot.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

interface IBlockedSlot {
  _id: string;
  selectedDate: string;
  selectedTime: string;
  reason?: string;
}

const DeleteBlockedTimeSlot = () => {
  const { id: blockedSlotId } = useParams();
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const [slot, setSlot] = useState<IBlockedSlot | null>(null);

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await fetch(
          `${URL_ADDRESS}/table/blocked/${blockedSlotId}`
        );

        const data = await response.json();

        if (data.status !== "success") {
          alertInfoCtx.setAlertInfoHandler(
            "Blocked Slot Not Found!",
            "The blocked time slot could not be found.",
            "Go to Blocked Times Overview",
            "/blocked-times-overview",
            "404"
          );
          return navigate("/alert");
        }

        setSlot(data.payload);
      } catch (err) {
        alertInfoCtx.setAlertInfoHandler(
          "Loading Failed!",
          "Failed to load blocked time slot data.",
          "Go to Blocked Times Overview",
          "/blocked-times-overview"
        );
        navigate("/alert");
      }
    };

    fetchSlot();
  }, [blockedSlotId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${URL_ADDRESS}/table/blocked/${blockedSlotId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Deletion Failed!",
          "The blocked time slot could not be deleted.",
          "Go to Blocked Times Overview",
          "/table-reservation-overview",
          "502"
        );
        return navigate("/alert");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Blocked Time Slot Deleted!",
        "The blocked time slot has been deleted successfully.",
        "Return to Blocked Times Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Deletion Failed!",
        "An error occurred while trying to delete the blocked time slot.",
        "Go to Blocked Times Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const handleCancel = () => {
    navigate("/table-reservation-overview");
  };

  if (!slot) return <p>Loading blocked slot data...</p>;

  return (
    <div className={classes.container}>
      <h1>Delete Blocked Time Slot</h1>

      <div className={classes.detailsCard}>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(slot.selectedDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {`${slot.selectedTime.slice(0, 2)}:${slot.selectedTime.slice(2, 4)}`}
        </p>
        {slot.reason && (
          <p>
            <strong>Reason:</strong> {slot.reason}
          </p>
        )}
      </div>

      <div className={classes.buttons}>
        <button onClick={handleDelete} className={classes.confirmButton}>
          Confirm Delete
        </button>
        <button onClick={handleCancel} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBlockedTimeSlot;
