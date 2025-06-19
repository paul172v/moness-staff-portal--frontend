import React from "react";
import { useNavigate } from "react-router-dom";

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
  category: string;
}

const MenuItem = (props: IProps) => {
  const navigate = useNavigate();
  const allergens = props.allergens?.join(", ");

  const handleEdit = () => {
    navigate(`/flemmyng-menu-overview/edit/${props.category}/${props.id}`);
  };

  const handleDelete = () => {
    navigate(`/flemmyng-menu-overview/delete/${props.category}/${props.id}`);
  };

  return (
    <div className={classes.container}>
      <p className={classes.name}>{props.name}</p>
      <p className={classes.options}>{props.options}</p>
      <p className={classes.allergens}>
        {props.allergens && props.allergens?.length > 0 ? `(${allergens})` : ""}
      </p>
      <p className={classes.description}>{props.description}</p>
      <p className={classes.price}>£{props.price.toFixed(2)}</p>

      <div className={classes["u-row"]}>
        <ButtonStandard label="Edit" function={handleEdit} />
        <ButtonStandard label="Delete" function={handleDelete} />
      </div>
    </div>
  );
};

export default MenuItem;
