import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";

import classes from "./DeleteBooking.module.scss";

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

const DeleteBooking = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const [booking, setBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${URL_ADDRESS}/table/${bookingId}`);

        const data = await response.json();

        if (data.status !== "success") {
          alertInfoCtx.setAlertInfoHandler(
            "Reservation Not Found!",
            "The reservation could not be found.",
            "Go to Table Reservation Overview",
            "/table-reservation-overview",
            "404"
          );
          return navigate("/alert");
        }

        setBooking(data.payload);
      } catch (err) {
        alertInfoCtx.setAlertInfoHandler(
          "Loading Failed!",
          "Failed to load reservation data.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview"
        );
        navigate("/alert");
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL_ADDRESS}/table/${bookingId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.status !== "success") {
        alertInfoCtx.setAlertInfoHandler(
          "Deletion Failed!",
          "There was an error, the reservation could not be deleted.",
          "Go to Table Reservation Overview",
          "/table-reservation-overview",
          "502"
        );
        return navigate("/alert");
      }

      alertInfoCtx.setAlertInfoHandler(
        "Reservation Deleted!",
        "The reservation has been deleted successfully.",
        "Return to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Deletion Failed!",
        "An unexpected error occurred while trying to delete the reservation.",
        "Go to Table Reservation Overview",
        "/table-reservation-overview"
      );
      navigate("/alert");
    }
  };

  const handleCancel = () => {
    navigate("/table-reservation-overview");
  };

  if (!booking) return <p>Loading booking data...</p>;

  return (
    <div className={classes.container}>
      <h1>Delete Booking</h1>

      <div className={classes.detailsCard}>
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
          <strong>Time:</strong> {booking.selectedTime}
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

export default DeleteBooking;
