import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./SearchBookingsByName.module.scss";

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

const SearchBookingsByName = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const goToEditBookingHandler = (bookingId: string) => {
    navigate(`/table-reservation-overview/edit-booking/${bookingId}`);
  };

  const goToDeleteBookingHandler = (bookingId: string) => {
    navigate(`/table-reservation-overview/delete-booking/${bookingId}`);
  };

  const fetchBookings = async () => {
    setError("");
    setBookings([]);

    if (!firstName && !lastName) {
      setError("Please enter at least a first name or last name.");
      return;
    }

    const body: Record<string, string> = {};
    if (firstName) body.firstName = firstName;
    if (lastName) body.lastName = lastName;

    try {
      const response = await fetch(`${URL_ADDRESS}/table/filter/by-name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "No Bookings Found",
          "No bookings matched that name. Try adjusting your search.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "404"
        );
        return navigate("/alert");
      }

      setBookings(data.bookings);
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Fetch Error",
        "An error occurred while trying to find bookings. Please try again.",
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
      <h1 className={classes.title}>Search Bookings By Name</h1>

      <label className={classes.label}>First Name:</label>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={classes.input}
      />

      <label className={classes.label}>Last Name:</label>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className={classes.input}
      />

      <button onClick={fetchBookings} className={classes.button}>
        Search
      </button>

      {error && <p className={classes.error}>{error}</p>}

      <div className={classes.results}>
        {bookings.length === 0 && <p>No bookings found for this name.</p>}
        {bookings.map((booking) => (
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
        ))}
      </div>

      <div className={classes.cancelWrapper}>
        <button onClick={cancelHandler} className={classes.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchBookingsByName;
