import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./SearchBookingsById.module.scss";

import { AlertInfoContext } from "../../../context/AlertInfoContext";

interface IBooking {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  numberOfGuests: number;
  occasion?: string;
  requests?: string;
  selectedDate: Date;
  selectedTime: string;
  tel: number;
}

const SearchBookingsById = () => {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<IBooking | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const goToEditBookingHandler = (id: string) => {
    navigate(`/table-reservation-overview/edit-booking/${id}`);
  };

  const goToDeleteBookingHandler = (id: string) => {
    navigate(`/table-reservation-overview/delete-booking/${id}`);
  };

  const fetchBooking = async () => {
    setError("");
    setBooking(null);

    if (!bookingId) {
      setError("Please enter a booking ID.");
      return;
    }

    try {
      const response = await fetch(`${URL_ADDRESS}/table/${bookingId}`);

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Booking Not Found!",
          "We could not find a booking with this ID.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "404"
        );
        return navigate("/alert");
      }

      setBooking(data.payload);
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Fetch Error",
        "An error occurred while trying to find this booking. Please try again.",
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
      <h1 className={classes.title}>Search Booking By ID</h1>

      <label className={classes.label}>Booking ID:</label>
      <input
        type="text"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        className={classes.input}
      />
      <button onClick={fetchBooking} className={classes.button}>
        Search
      </button>

      {error && <p className={classes.error}>{error}</p>}

      <div className={classes.results}>
        {!booking && <p>No booking found for this ID.</p>}
        {booking && (
          <div key={booking._id} className={classes.bookingCard}>
            <p>
              <strong>ID:</strong> {booking._id}
            </p>
            <p>
              <strong>Name:</strong> {booking.firstName} {booking.lastName}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Phone:</strong> {booking.tel}
            </p>
            <p>
              <strong>Guests:</strong> {booking.numberOfGuests}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.selectedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {`${booking.selectedTime.slice(
                0,
                2
              )}:${booking.selectedTime.slice(2, 4)}`}
            </p>
            {booking.occasion && (
              <p>
                <strong>Occasion:</strong> {booking.occasion}
              </p>
            )}
            {booking.requests && (
              <p>
                <strong>Requests:</strong> {booking.requests}
              </p>
            )}
            <div className={classes.actions}>
              <button
                onClick={() => goToEditBookingHandler(booking._id)}
                className={classes.editBtn}
              >
                Edit
              </button>
              <button
                onClick={() => goToDeleteBookingHandler(booking._id)}
                className={classes.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={classes.cancelWrapper}>
        <button onClick={cancelHandler} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchBookingsById;
