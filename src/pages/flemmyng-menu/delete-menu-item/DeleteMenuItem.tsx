import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";
import { AlertInfoContext } from "../../../context/AlertInfoContext";

import classes from "./DeleteMenuItem.module.scss";

const DeleteMenuItem = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category || !id) return;

    const fetchItemName = async () => {
      try {
        const res = await fetch(`${URL_ADDRESS}/flemmyng/${category}/${id}`);
        const data = await res.json();
        if (data.status === "success" && data.payload?.name) {
          setItemName(data.payload.name);
        } else {
          throw new Error("Item not found");
        }
      } catch (err) {
        setError("Could not load item information.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemName();
  }, [category, id]);

  const deleteHandler = async () => {
    try {
      const res = await fetch(`${URL_ADDRESS}/flemmyng/${category}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.status !== "success") throw new Error("Delete failed");

      alertInfoCtx.setAlertInfoHandler(
        "Menu Item Deleted",
        "The item was successfully deleted.",
        "Back to Flemmyng Menu",
        "/flemmyng-menu-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Delete Failed",
        "There was an error deleting this item. Please try again.",
        "Back to Flemmyng Menu",
        "/flemmyng-menu-overview"
      );
      navigate("/alert");
    }
  };

  const cancelHandler = () => {
    navigate("/flemmyng-menu-overview");
  };

  if (loading) return <p className={classes.loading}>Loading item...</p>;
  if (error) return <p className={classes.error}>{error}</p>;

  return (
    <div className={classes.container}>
      <h1>Delete Menu Item</h1>
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>?
      </p>

      <button onClick={deleteHandler} className={classes.button}>
        Delete
      </button>
      <button onClick={cancelHandler} className={classes.cancelButton}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteMenuItem;
