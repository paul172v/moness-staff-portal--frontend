import { useNavigate } from "react-router-dom";
import classes from "./TableReservationOverview.module.scss";

import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";

const TableReservationOverview = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Table Reservation Overview</h1>
      <p className={classes.message}>
        Choose an option below to manage bookings:
      </p>

      <ButtonStandard
        label="View Bookings by Date"
        function={() =>
          navigate("/table-reservation-overview/view-bookings-by-date")
        }
      />
      <ButtonStandard
        label="Search Bookings by Name"
        function={() =>
          navigate("/table-reservation-overview/search-bookings-by-name")
        }
      />
      <ButtonStandard
        label="Search Bookings by Email"
        function={() =>
          navigate("/table-reservation-overview/search-bookings-by-email")
        }
      />
      <ButtonStandard
        label="Search Bookings by ID"
        function={() =>
          navigate("/table-reservation-overview/search-bookings-by-id")
        }
      />
      <ButtonStandard
        label="Create Booking"
        function={() => navigate("/table-reservation-overview/create-booking")}
      />
      <ButtonStandard
        label="Block Time Slot"
        function={() =>
          navigate("/table-reservation-overview/create-blocked-time-slot")
        }
      />
      <ButtonStandard
        label="Back to Menu"
        function={() => navigate("/logged-in")}
      />
    </div>
  );
};

export default TableReservationOverview;
