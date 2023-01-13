import React from "react";
import classes from "./BurgerControl.css";

const burgerControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} disabled={props.disabled} onClick={props.removeIng}>Less</button>
      <button className={classes.More} onClick={props.addIng}>More</button>
    </div>
  );
};

export default burgerControl;
