import React from "react";

import classes from "./MenuItem.module.scss";

import ButtonStandard from "../../../components/buttons/button-standard/ButtonStandard";

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

interface IProps {
  id: string;
  name: string;
  price: number;
  allergens?: Allergens[] | null;
  description?: string | null;
  options?: Options | null;
}

const MenuItem = (props: IProps) => {
  const allergens = props.allergens?.join(", ");

  return (
    <div className={classes.container}>
      <p className={classes.name}>{props.name}</p>
      <p className={classes.options}>{props.options}</p>
      <p className={classes.allergens}>
        {props.allergens ? `(${allergens})` : ""}
      </p>
      <p className={classes.description}>{props.description}</p>
      <p className={classes.price}>£{props.price}</p>

      <div className={classes["u-row"]}>
        <ButtonStandard label="Edit" function={() => {}} />
        <ButtonStandard label="Delete" function={() => {}} />
      </div>
    </div>
  );
};

export default MenuItem;
