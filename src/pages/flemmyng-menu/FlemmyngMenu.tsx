import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import URL_ADDRESS from "../../dev/url";

import classes from "./FlemmyngMenu.module.scss";

import MenuItem from "./short-menu-item/MenuItem";
import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";
import Loader from "../../components/loader/Loader";

// Types

type Options =
  | "GF"
  | "DF"
  | "GF/DF"
  | "GF available"
  | "DF available"
  | "GF/DF available";

type Allergens =
  | "Ce"
  | "Cr"
  | "E"
  | "F"
  | "G"
  | "Lu"
  | "Mi"
  | "Mo"
  | "Mu"
  | "N"
  | "Pnut"
  | "Se"
  | "So"
  | "Sd"
  | "V"
  | "Vg";

interface IMenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  options?: Options;
  allergens?: Allergens[];
}

const FlemmyngMenu = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [menuArrs, setMenuArrs] = useState<{
    whileYouWaitArr: IMenuItem[];
    startersArr: IMenuItem[];
    mainsArr: IMenuItem[];
    sidesArr: IMenuItem[];
    dessertsArr: IMenuItem[];
  }>({
    whileYouWaitArr: [],
    startersArr: [],
    mainsArr: [],
    sidesArr: [],
    dessertsArr: [],
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${URL_ADDRESS}/flemmyng/`);
        if (!response.ok) throw new Error("Failed to fetch menu data");
        const data = await response.json();

        setMenuArrs({
          whileYouWaitArr: data.payload.whileYouWait || [],
          startersArr: data.payload.starters || [],
          mainsArr: data.payload.mains || [],
          sidesArr: data.payload.sides || [],
          dessertsArr: data.payload.desserts || [],
        });

        setDataIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataIsLoaded(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const renderSection = (title: string, items: IMenuItem[], category: string) =>
    items.length > 0 && (
      <>
        <h2 className={classes["sub-title"]}>{title}</h2>
        {items.map((item) => (
          <MenuItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
            category={category}
          />
        ))}
        <div className={classes["u-gap"]} />
        <ButtonStandard
          label="Create New Item"
          function={() =>
            navigate(`/flemmyng-menu-overview/create/${category}`)
          }
        />
        <div className={classes["u-bookend"]} />
      </>
    );

  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Flemmyng Menu</h1>

      {isLoading && (
        <div className={classes["loader-wrapper"]}>
          <Loader />
        </div>
      )}

      {!isLoading && !dataIsLoaded && (
        <div className={classes["loader-wrapper"]}>
          <p className={classes["error-message"]}>
            ⚠️ There was an error loading the menu data, please try again. ⚠️
          </p>
        </div>
      )}

      {!isLoading && dataIsLoaded && (
        <>
          {renderSection(
            "While You Wait",
            menuArrs.whileYouWaitArr,
            "while-you-wait"
          )}
          {renderSection("Starters", menuArrs.startersArr, "starters")}
          {renderSection("Mains", menuArrs.mainsArr, "mains")}
          {renderSection("Sides", menuArrs.sidesArr, "sides")}
          {renderSection("Desserts", menuArrs.dessertsArr, "desserts")}

          <ButtonStandard
            label="Back to Menu"
            function={() => {
              navigate("/logged-in");
            }}
          />
        </>
      )}
    </div>
  );
};

export default FlemmyngMenu;
