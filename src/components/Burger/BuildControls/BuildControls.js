import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const control=[
    {label : "Salad", type:"salad"},
    {label : "Cheese", type:"cheese"},
    {label : "Meat", type:"meat"},
    {label : "Chicken", type:"chicken"},
    
]

const buildControls = props =>(
    <div className={classes.BuildControls}>
        <p>Current Price : Rs.{props.price}</p>
        {control.map(ctrl =>(
            <BuildControl
             key={ctrl.label} 
             label={ctrl.label}
             addIng = {() => props.addIngredient(ctrl.type)}
             removeIng = {()=>props.removeIngredient(ctrl.type)}
             disabled={props.disabled[ctrl.type]} />
        ))}
        <button className={classes.OrderButton}
        disabled = {!props.purchaseable}
        onClick={props.ordered}>Order Now</button>
    </div>
); 

export default buildControls;