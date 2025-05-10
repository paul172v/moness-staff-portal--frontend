import { useNavigate } from "react-router-dom";
import classes from "./TableReservationOverview.module.scss";
import { FaRegCalendarAlt, FaRegIdCard } from "react-icons/fa";
import { MdPerson, MdOutlineEmail, MdTableBar } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { TbScissors } from "react-icons/tb";

import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";

const TableReservationOverview = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Table Reservation</h1>
      <p className={classes.message}>
        Choose an option below to manage bookings:
      </p>

      <div className={classes.grid}>
        <div className={classes.card}>
          <FaRegCalendarAlt className={classes.icon} />
          <ButtonStandard
            label="View by Date"
            function={() =>
              navigate("/table-reservation-overview/view-bookings-by-date")
            }
          />
        </div>

        <div className={classes.card}>
          <MdPerson className={classes.icon} />
          <ButtonStandard
            label="Search by Name"
            function={() =>
              navigate("/table-reservation-overview/search-bookings-by-name")
            }
          />
        </div>

        <div className={classes.card}>
          <MdOutlineEmail className={classes.icon} />
          <ButtonStandard
            label="Search by Email"
            function={() =>
              navigate("/table-reservation-overview/search-bookings-by-email")
            }
          />
        </div>

        <div className={classes.card}>
          <FaRegIdCard className={classes.icon} />
          <ButtonStandard
            label="Search by ID"
            function={() =>
              navigate("/table-reservation-overview/search-bookings-by-id")
            }
          />
        </div>

        <div className={classes.card}>
          <MdTableBar className={classes.icon} />
          <ButtonStandard
            label="Create Booking"
            function={() =>
              navigate("/table-reservation-overview/create-booking")
            }
          />
        </div>

        <div className={classes.card}>
          <ImCross className={classes.icon} />
          <ButtonStandard
            label="Block Time Slot"
            function={() =>
              navigate("/table-reservation-overview/create-blocked-time-slot")
            }
          />
        </div>

        <div className={classes.card}>
          <TbScissors className={classes.icon} />
          <ButtonStandard
            label="Prune Bookings"
            function={() =>
              navigate("/table-reservation-overview/prune-all-bookings")
            }
          />
        </div>
      </div>

      <ButtonStandard
        label="Back to Menu"
        function={() => navigate("/logged-in")}
      />
    </div>
  );
};

export default TableReservationOverview;
