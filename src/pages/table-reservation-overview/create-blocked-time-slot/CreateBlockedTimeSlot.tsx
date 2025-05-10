import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./CreateBlockedTimeSlot.module.scss";
import URL_ADDRESS from "../../../dev/url";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

const CreateBlockedTimeSlot = () => {
  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedTime: "",
  });

  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      alertInfoCtx.setAlertInfoHandler(
        "Missing Information",
        "Please select both a date and a time to block.",
        "Back to Table Reservation Overview",
        "/table-reservation-overview"
      );
      return navigate("/alert");
    }

    const cleanedTime = formData.selectedTime.replace(":", "");

    try {
      const response = await fetch(`${URL_ADDRESS}/table/blocked`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedDate: formData.selectedDate,
          selectedTime: cleanedTime,
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create blocked slot");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Time Slot Blocked!",
        "The selected time slot has been blocked successfully.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Blocking Failed!",
        "Failed to create blocked slot. Please try again.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const cancelHandler = () => {
    navigate("/table-reservation-overview");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Block a Time Slot</h1>

      <div>
        <label className={classes.label}>Date:</label>
        <input
          name="selectedDate"
          type="date"
          value={formData.selectedDate}
          onChange={handleChange}
          className={classes.input}
        />
      </div>

      <div>
        <label className={classes.label}>Time:</label>
        <input
          name="selectedTime"
          type="time"
          value={formData.selectedTime}
          onChange={handleChange}
          className={classes.input}
        />
      </div>

      <button onClick={handleSubmit} className={classes.button}>
        Block Time Slot
      </button>

      <div className={classes.cancelWrapper}>
        <button onClick={cancelHandler} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateBlockedTimeSlot;
