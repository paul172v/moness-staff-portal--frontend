import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./CreateBooking.module.scss";
import { AlertInfoContext } from "../../../context/AlertInfoContext";

const CreateBooking = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    selectedDate: "",
    selectedTime: "",
    numberOfGuests: "",
    occasion: "",
    requests: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");

    // Required field validation (excluding occasion & requests)
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.tel ||
      !formData.selectedDate ||
      !formData.selectedTime ||
      !formData.numberOfGuests
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const cleanedTime = formData.selectedTime.replace(":", "");

    // Build payload
    const payload: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      tel: formData.tel,
      selectedDate: formData.selectedDate,
      selectedTime: cleanedTime,
      numberOfGuests: Number(formData.numberOfGuests),
      termsAccepted: true,
    };

    // Include optional fields if filled
    if (formData.occasion) payload.occasion = formData.occasion;
    if (formData.requests) payload.requests = formData.requests;

    try {
      const response = await fetch(`${URL_ADDRESS}/table/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.message === "This time slot is blocked and cannot be booked.") {
        alertInfoCtx.setAlertInfoHandler(
          "Time Slot Blocked",
          "This time slot has been blocked and cannot be booked. Please select another time.",
          "Back to Table Reservation Overview",
          "/table-reservation-overview"
        );
        return navigate("/alert");
      }

      if (data.status !== "success") {
        throw new Error("Booking submission failed.");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Booking Created!",
        "Your booking was successfully created.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      console.error(err);
      alertInfoCtx.setAlertInfoHandler(
        "Booking Failed",
        "There was an error submitting your booking. Please try again.",
        "Back to Table Reservation Overview",
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
      <h1 className={classes.title}>Create Booking</h1>

      {[
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "tel", label: "Phone Number" },
        { name: "email", label: "Email", type: "email" },
        { name: "selectedDate", label: "Date", type: "date" },
        { name: "selectedTime", label: "Time", type: "time" },
        { name: "numberOfGuests", label: "Number of Guests", type: "number" },
        { name: "occasion", label: "Occasion (optional)" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name}>
          <label className={classes.label}>{label}:</label>
          <input
            name={name}
            type={type}
            value={(formData as any)[name]}
            onChange={handleChange}
            className={classes.input}
          />
        </div>
      ))}

      <label className={classes.label}>Special Requests (optional):</label>
      <textarea
        name="requests"
        value={formData.requests}
        onChange={handleChange}
        className={classes.input}
        rows={3}
      />

      {error && <p className={classes.error}>{error}</p>}

      <button onClick={handleSubmit} className={classes.button}>
        Submit Booking
      </button>

      <div className={classes.cancelWrapper}>
        <button onClick={cancelHandler} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateBooking;
