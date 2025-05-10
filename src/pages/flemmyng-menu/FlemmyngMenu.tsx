import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./FlemmyngMenu.module.scss";

import MenuItem from "./short-menu-item/MenuItem";
import ButtonStandard from "../../components/buttons/button-standard/ButtonStandard";

import {
  whileYouWaitArr,
  startersArr,
  mainsArr,
  sidesArr,
  dessertsArr,
} from "../../dev/flemmyngMenu";

const FlemmyngMenu = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <img className={classes.logo} src="/moness-logo.jpg" alt="Moness Logo" />
      <h1 className={classes.title}>Flemmyng Menu</h1>
      <h2 className={classes["sub-title"]}>While You Wait</h2>
      {whileYouWaitArr.map((item) => {
        return (
          <MenuItem
            id={item.name}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
          />
        );
      })}
      <div className={classes["u-gap"]} />
      <ButtonStandard label="Create New Item" function={() => {}} />
      <div className={classes["u-bookend"]} />

      <h2 className={classes["sub-title"]}>Starters</h2>
      {startersArr.map((item) => {
        return (
          <MenuItem
            id={item.name}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
          />
        );
      })}
      <div className={classes["u-gap"]} />
      <ButtonStandard label="Create New Item" function={() => {}} />
      <div className={classes["u-bookend"]} />

      <h2 className={classes["sub-title"]}>Mains</h2>
      {mainsArr.map((item) => {
        return (
          <MenuItem
            id={item.name}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
          />
        );
      })}
      <div className={classes["u-gap"]} />
      <ButtonStandard label="Create New Item" function={() => {}} />
      <div className={classes["u-bookend"]} />

      <h2 className={classes["sub-title"]}>Sides</h2>
      {sidesArr.map((item) => {
        return (
          <MenuItem
            id={item.name}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
          />
        );
      })}
      <div className={classes["u-gap"]} />
      <ButtonStandard label="Create New Item" function={() => {}} />
      <div className={classes["u-bookend"]} />

      <h2 className={classes["sub-title"]}>Desserts</h2>
      {dessertsArr.map((item) => {
        return (
          <MenuItem
            id={item.name}
            name={item.name}
            price={item.price}
            allergens={item.allergens}
            description={item.description}
            options={item.options}
          />
        );
      })}
      <div className={classes["u-gap"]} />
      <ButtonStandard label="Create New Item" function={() => {}} />
      <div className={classes["u-bookend"]} />
      <ButtonStandard
        label="Back to Menu"
        function={() => {
          navigate("/logged-in");
        }}
      />
    </div>
  );
};

export default FlemmyngMenu;
