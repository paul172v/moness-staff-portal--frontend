import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./ViewBookingsByDate.module.scss";

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

const ViewBookingsByDate = () => {
  const [selectedDate, setSelectedDate] = useState("");
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

  const goToEditBlockedSlotHandler = (bookingId: string) => {
    navigate(`/table-reservation-overview/edit-blocked-time-slot/${bookingId}`);
  };

  const goToDeleteBlockedSlotHandler = (bookingId: string) => {
    navigate(
      `/table-reservation-overview/delete-blocked-time-slot/${bookingId}`
    );
  };

  const fetchBookings = async () => {
    setError("");
    setBookings([]);

    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }

    const isoDate = new Date(selectedDate).toISOString();

    try {
      const response = await fetch(`${URL_ADDRESS}/table/filter/by-date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedDate: isoDate }),
      });

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Fetch Error",
        "An error occurred while retrieving bookings for this date. Please try again.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const editHandler = (
    bookingId: string,
    bookingFirstName: string,
    bookingLastName: string
  ) => {
    if (bookingFirstName === "Blocked" && bookingLastName === "Slot") {
      goToEditBlockedSlotHandler(bookingId);
    } else {
      goToEditBookingHandler(bookingId);
    }
  };

  const deleteHandler = (
    bookingId: string,
    bookingFirstName: string,
    bookingLastName: string
  ) => {
    if (bookingFirstName === "Blocked" && bookingLastName === "Slot") {
      goToDeleteBlockedSlotHandler(bookingId);
    } else {
      goToDeleteBookingHandler(bookingId);
    }
  };

  const cancelHandler = () => {
    navigate("/table-reservation-overview");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>View Bookings By Date</h1>
      <label className={classes.label}>Select a date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={classes.datePicker}
      />
      <button onClick={fetchBookings} className={classes.button}>
        Search
      </button>

      {error && <p className={classes.error}>{error}</p>}

      <div className={classes.results}>
        {bookings.length === 0 && <p>No bookings found for this date.</p>}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className={
              (booking.firstName === "Blocked" &&
                booking.lastName === "Slot" &&
                classes.blockedSlotCard) ||
              classes.bookingCard
            }
          >
            {booking.firstName === "Blocked" && booking.lastName === "Slot" ? (
              <></>
            ) : (
              <p>
                <strong>ID:</strong> {booking._id}
              </p>
            )}

            <p>
              <strong>Name:</strong> {booking.firstName} {booking.lastName}
            </p>
            {booking.email && (
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
            )}
            {booking.tel && (
              <p>
                <strong>Phone:</strong> {booking.tel}
              </p>
            )}
            {booking.numberOfGuests && (
              <p>
                <strong>Guests:</strong> {booking.numberOfGuests}
              </p>
            )}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(booking.selectedDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {booking.selectedTime.slice(0, 2)}
              {":"}
              {booking.selectedTime.slice(2, 4)}
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
                onClick={() =>
                  editHandler(booking._id, booking.firstName, booking.lastName)
                }
                className={classes.editBtn}
              >
                Edit
              </button>
              <button
                onClick={() =>
                  deleteHandler(
                    booking._id,
                    booking.firstName,
                    booking.lastName
                  )
                }
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

export default ViewBookingsByDate;
