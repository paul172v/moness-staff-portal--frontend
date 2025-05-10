import React from "react";

import classes from "./ButtonStandard.module.scss";

interface IProps {
  label: string;
  function?: () => void;
}

const ButtonStandard = (props: IProps) => {
  return (
    <button className={classes.button} onClick={props.function}>
      {props.label}
    </button>
  );
};

export default ButtonStandard;
