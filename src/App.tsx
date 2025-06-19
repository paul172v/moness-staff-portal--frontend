import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import classes from "./App.module.scss";

//Context
import { ShowHeaderSettingsContext } from "./context/ShowHeader";

// Header
import Header from "./components/header/Header";

// Pages
import Home from "./pages/home-and-auth/home/Home";
import SignUp from "./pages/home-and-auth/sign-up/SignUp";
import LogIn from "./pages/home-and-auth/log-in/LogIn";
import ForgotPasswordSendEmail from "./pages/home-and-auth/forgot-password--send-email/ForgotPasswordSendEmail";
import ForgotPasswordChangePassword from "./pages/home-and-auth/forgot-password--change-password/ForgotPasswordChangePassword";
import LoggedIn from "./pages/logged-in/LoggedIn";
import Unauthorized from "./pages/home-and-auth/unauthorized/Unauthorized";
import Alert from "./pages/alert/Alert";
import ViewEmployeeAccessLevels from "./pages/manager/employee-access-pages/view-employee-access-levels/ViewEmployeeAccessLevels";
import EditEmployeeAccessLevel from "./pages/manager/employee-access-pages/edit-employee-access/EditEmployeeAccessLevel";
import ConfirmDeleteEmployee from "./pages/manager/employee-access-pages/confirm-delete-employee/ConfirmDeleteEmployee";
import ViewUserDetails from "./pages/user-details/view-user-details/ViewUserDetails";
import EditUserDetails from "./pages/user-details/edit-user-details/EditUserDetails";
import EditUserPassword from "./pages/user-details/edit-user-password/EditUserPassword";
import TableReservationOverview from "./pages/table-reservation-overview/TableReservationOverview";
import ViewBookingsByDate from "./pages/table-reservation-overview/view-bookings-by-date/ViewBookingsByDate";
import EditBooking from "./pages/table-reservation-overview/edit-booking/EditBooking";
import DeleteBooking from "./pages/table-reservation-overview/delete-booking/DeleteBooking";
import SearchBookingsByName from "./pages/table-reservation-overview/search-bookings-by-name/SearchBookingsByName";
import SearchBookingsByEmail from "./pages/table-reservation-overview/search-bookings-by-email/SearchBookingsByEmail";
import SearchBookingsById from "./pages/table-reservation-overview/search-bookings-by-id/SearchBookingsById";
import CreateBooking from "./pages/table-reservation-overview/create-booking/CreateBooking";
import CreateBlockedTimeSlot from "./pages/table-reservation-overview/create-blocked-time-slot/CreateBlockedTimeSlot";
import EditBlockedTimeSlot from "./pages/table-reservation-overview/edit-blocked-time-slot/EditBlockedTimeSlot";
import DeleteBlockedTimeSlot from "./pages/table-reservation-overview/delete-blocked-time-slot/DeleteBlockedTimeSlot";
import PruneAllBookings from "./pages/table-reservation-overview/prune-all-bookings/PruneAllBookings";
import FlemmyngMenu from "./pages/flemmyng-menu/FlemmyngMenu";
import CreateMenuItem from "./pages/flemmyng-menu/create-menu-item/CreateMenuItem";
import EditMenuItem from "./pages/flemmyng-menu/edit-menu-item/EditMenuItem";
import DeleteMenuItem from "./pages/flemmyng-menu/delete-menu-item/DeleteMenuItem";

function App() {
  const showHeaderSettingsCtx = useContext(ShowHeaderSettingsContext);

  return (
    <Router>
      {showHeaderSettingsCtx.settings.showHeader === true &&
        (showHeaderSettingsCtx.settings.role === "Manager" ||
          showHeaderSettingsCtx.settings.role === "Allowed") && <Header />}
      <div className={classes.page}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route
            path="/forgot-password/send-email"
            element={<ForgotPasswordSendEmail />}
          />
          <Route
            path="/forgot-password/change-password/:token"
            element={<ForgotPasswordChangePassword />}
          />
          <Route path="/logged-in" element={<LoggedIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/alert" element={<Alert />} />
          <Route
            path="/manager/employee-access-levels/view-employee-access-levels"
            element={<ViewEmployeeAccessLevels />}
          />
          <Route
            path="/manager/employee-access-levels/edit-employee-access-level/:id"
            element={<EditEmployeeAccessLevel />}
          />
          <Route
            path="/manager/employee-access-levels/confirm-delete-employee/:id"
            element={<ConfirmDeleteEmployee />}
          />
          <Route
            path="/user-details/view-user-details"
            element={<ViewUserDetails />}
          />
          <Route
            path="/user-details/edit-user-details/:id"
            element={<EditUserDetails />}
          />
          <Route
            path="/user-details/edit-user-password/:id"
            element={<EditUserPassword />}
          />
          <Route
            path="/table-reservation-overview"
            element={<TableReservationOverview />}
          />
          <Route
            path="/table-reservation-overview/view-bookings-by-date"
            element={<ViewBookingsByDate />}
          />
          <Route
            path="/table-reservation-overview/edit-booking/:id"
            element={<EditBooking />}
          />

          <Route
            path="/table-reservation-overview/delete-booking/:id"
            element={<DeleteBooking />}
          />

          <Route
            path="/table-reservation-overview/search-bookings-by-name"
            element={<SearchBookingsByName />}
          />
          <Route
            path="/table-reservation-overview/search-bookings-by-email"
            element={<SearchBookingsByEmail />}
          />
          <Route
            path="/table-reservation-overview/search-bookings-by-id"
            element={<SearchBookingsById />}
          />
          <Route
            path="/table-reservation-overview/create-booking"
            element={<CreateBooking />}
          />
          <Route
            path="/table-reservation-overview/create-blocked-time-slot"
            element={<CreateBlockedTimeSlot />}
          />
          <Route
            path="/table-reservation-overview/edit-blocked-time-slot/:id"
            element={<EditBlockedTimeSlot />}
          />
          <Route
            path="/table-reservation-overview/delete-blocked-time-slot/:id"
            element={<DeleteBlockedTimeSlot />}
          />
          <Route
            path="/table-reservation-overview/prune-all-bookings"
            element={<PruneAllBookings />}
          />
          <Route path="/flemmyng-menu-overview" element={<FlemmyngMenu />} />
          <Route
            path="/flemmyng-menu-overview/create/:category"
            element={<CreateMenuItem />}
          />
          <Route
            path="/flemmyng-menu-overview/edit/:category/:id"
            element={<EditMenuItem />}
          />
          <Route
            path="/flemmyng-menu-overview/delete/:category/:id"
            element={<DeleteMenuItem />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
