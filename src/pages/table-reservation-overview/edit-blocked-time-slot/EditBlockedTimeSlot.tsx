import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./EditBlockedTimeSlot.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

interface IBlockedSlot {
  _id: string;
  selectedDate: string;
  selectedTime: string;
}

const EditBlockedTimeSlot = () => {
  const { id: blockedSlotId } = useParams();
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const [formData, setFormData] = useState<IBlockedSlot | null>(null);

  useEffect(() => {
    const fetchBlockedSlot = async () => {
      try {
        const response = await fetch(
          `${URL_ADDRESS}/table/blocked/${blockedSlotId}`
        );

        const data = await response.json();

        if (data.status !== "success") {
          alertInfoCtx.setAlertInfoHandler(
            "Blocked Slot Not Found!",
            "The blocked time slot could not be found.",
            "Go to Table Reservation Overview",
            "/table-reservation-overview",
            "404"
          );
          return navigate("/alert");
        }

        setFormData(data.payload);
      } catch (err) {
        alertInfoCtx.setAlertInfoHandler(
          "Loading Failed!",
          "Failed to load the blocked time slot.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview"
        );
        navigate("/alert");
      }
    };

    fetchBlockedSlot();
  }, [blockedSlotId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${URL_ADDRESS}/table/blocked/${blockedSlotId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            selectedTime: formData?.selectedTime.replace(":", ""),
          }),
        }
      );

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Update Failed!",
          "The blocked time slot could not be updated.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "502"
        );
        return navigate("/alert");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Blocked Time Slot Updated!",
        "The blocked time slot has been updated successfully.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Update Failed!",
        "An unexpected error occurred while updating the blocked time slot.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const handleCancel = () => {
    navigate("/table-reservation-overview");
  };

  if (!formData) return <p>Loading blocked slot data...</p>;

  return (
    <div className={classes.container}>
      <h1>Edit Blocked Time Slot</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="date"
          name="selectedDate"
          value={formData.selectedDate.slice(0, 10)}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="selectedTime"
          value={
            formData.selectedTime.length === 4
              ? `${formData.selectedTime.slice(
                  0,
                  2
                )}:${formData.selectedTime.slice(2)}`
              : formData.selectedTime
          }
          onChange={handleChange}
          required
        />

        <div className={classes.buttons}>
          <button type="submit" className={classes.saveButton}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={classes.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlockedTimeSlot;
