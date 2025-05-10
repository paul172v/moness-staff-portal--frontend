import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./EditBooking.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

interface IBooking {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  numberOfGuests: number;
  occasion?: string;
  requests?: string;
  selectedDate: string;
  selectedTime: string;
  tel: string;
}

const EditBooking = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();

  const alertInfoCtx = useContext(AlertInfoContext);

  const [formData, setFormData] = useState<IBooking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${URL_ADDRESS}/table/${bookingId}`);
        const data = await response.json();

        if (data.status !== "success") {
          alertInfoCtx.setAlertInfoHandler(
            "Booking Not Found!",
            "This booking could not be found.",
            "Go to Table Reservation Overview",
            "/table-reservation-overview",
            "404"
          );
          return navigate("/alert");
        }

        setFormData(data.payload);
      } catch (err) {
        alertInfoCtx.setAlertInfoHandler(
          "Failed to Load Booking!",
          "There was an error loading the booking.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview"
        );
        navigate("/alert");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL_ADDRESS}/table/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Update Failed!",
          "There was an error, the reservation was not updated.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "501"
        );
        return navigate("/alert");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Update Successful!",
        "The reservation has been updated successfully.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Update Failed!",
        "There was an error updating this booking.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const handleCancel = () => {
    navigate("/table-reservation-overview");
  };

  if (!formData) return <p>Loading booking data...</p>;

  return (
    <div className={classes.container}>
      <h1>Edit Booking</h1>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="number"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          placeholder="Number of Guests"
          required
        />
        <input
          type="date"
          name="selectedDate"
          value={formData.selectedDate.slice(0, 10)}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="selectedTime"
          value={formData.selectedTime}
          onChange={handleChange}
          placeholder="Time (e.g., 1730)"
          required
        />
        <input
          type="text"
          name="occasion"
          value={formData.occasion || ""}
          onChange={handleChange}
          placeholder="Occasion (optional)"
        />
        <textarea
          name="requests"
          value={formData.requests || ""}
          onChange={handleChange}
          placeholder="Requests (optional)"
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

export default EditBooking;
