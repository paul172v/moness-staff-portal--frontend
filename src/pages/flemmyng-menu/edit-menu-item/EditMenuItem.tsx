import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL_ADDRESS from "../../../dev/url";
import { AlertInfoContext } from "../../../context/AlertInfoContext";

import classes from "./EditMenuItem.module.scss";

const OPTIONS = [
  "GF",
  "DF",
  "GF/DF",
  "GF available",
  "DF available",
  "GF/DF available",
];

const ALLERGENS = [
  "Ce",
  "Cr",
  "E",
  "F",
  "G",
  "Lu",
  "Mi",
  "Mo",
  "Mu",
  "N",
  "Pnut",
  "Se",
  "So",
  "Sd",
  "V",
  "Vg",
];

const EditMenuItem = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const alertInfoCtx = useContext(AlertInfoContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    options: [] as string[],
    allergens: [] as string[],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (!category || !id) return;

    const fetchAndConfigure = async () => {
      try {
        const res = await fetch(`${URL_ADDRESS}/flemmyng/${category}/${id}`);
        const data = await res.json();

        if (data.status === "success") {
          const { name, description, price, options, allergens } = data.payload;

          setFormData({
            name: name || "",
            description: description || "",
            price: price?.toString() || "",
            options: options || [],
            allergens: allergens || [],
          });
        } else {
          throw new Error("Invalid data format");
        }

        switch (category) {
          case "while-you-wait":
            setShowAllergens(true);
            break;
          case "starters":
          case "mains":
            setShowDescription(true);
            setShowAllergens(true);
            setShowOptions(true);
            break;
          case "sides":
            setShowAllergens(true);
            setShowOptions(true);
            break;
          case "desserts":
            setShowDescription(true);
            setShowOptions(true);
            break;
          default:
            break;
        }
      } catch (err) {
        alertInfoCtx.setAlertInfoHandler(
          "Load Failed",
          "Could not load item data. Please try again.",
          "Back to Flemmyng Menu",
          "/flemmyng-menu-overview"
        );
        return navigate("/alert");
      } finally {
        setLoading(false);
      }
    };

    fetchAndConfigure();
  }, [category, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    type: "options" | "allergens",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updated };
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (!formData.name || !formData.price || !category || !id) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload: {
      name: string;
      price: number;
      description?: string;
      allergens?: string[];
      options?: string[];
    } = {
      name: formData.name,
      price: parseFloat(formData.price),
      allergens: formData.allergens || [],
    };

    if (formData.description) payload.description = formData.description;
    if (formData.allergens.length) payload.allergens = formData.allergens;
    if (formData.options.length && category !== "while-you-wait")
      payload.options = formData.options;

    try {
      const response = await fetch(
        `${URL_ADDRESS}/flemmyng/${category}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.status !== "success") throw new Error("Update failed.");

      alertInfoCtx.setAlertInfoHandler(
        "Menu Item Updated",
        "Menu item successfully updated.",
        "Back to Flemmyng Menu",
        "/flemmyng-menu-overview"
      );
      navigate("/alert");
    } catch (err) {
      alertInfoCtx.setAlertInfoHandler(
        "Update Failed",
        "There was an error updating this item. Please try again.",
        "Back to Flemmyng Menu",
        "/flemmyng-menu-overview"
      );
      navigate("/alert");
    }
  };

  const cancelHandler = () => {
    navigate("/flemmyng-menu-overview");
  };

  if (loading) {
    return <p className={classes.loading}>Loading item data...</p>;
  }

  return (
    <div className={classes.container}>
      <h1>Edit Menu Item</h1>

      <label className={classes.label}>Name:</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={classes.input}
        required
      />

      {showDescription && (
        <>
          <label className={classes.label}>Description (optional):</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={classes.input}
            rows={3}
          />
        </>
      )}

      <label className={classes.label}>Price:</label>
      <input
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        className={classes.input}
        required
      />

      {showOptions && (
        <>
          <label className={classes.label}>Options:</label>
          <div className={classes.checkboxGroup}>
            {OPTIONS.map((option) => (
              <label key={option} className={classes.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.options.includes(option)}
                  onChange={() => handleCheckboxChange("options", option)}
                />
                {option}
              </label>
            ))}
          </div>
        </>
      )}

      {showAllergens && (
        <>
          <label className={classes.label}>Allergens:</label>
          <div className={classes.checkboxGroup}>
            {ALLERGENS.map((allergen) => (
              <label key={allergen} className={classes.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.allergens.includes(allergen)}
                  onChange={() => handleCheckboxChange("allergens", allergen)}
                />
                {allergen}
              </label>
            ))}
          </div>
        </>
      )}

      {error && <p className={classes.error}>{error}</p>}

      <button onClick={handleSubmit} className={classes.button}>
        Submit
      </button>
      <button onClick={cancelHandler} className={classes.cancelButton}>
        Cancel
      </button>
    </div>
  );
};

export default EditMenuItem;
