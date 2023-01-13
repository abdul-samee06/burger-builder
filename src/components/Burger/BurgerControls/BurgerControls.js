import React from 'react';
import classes from './BurgerControls.css'
import BurgerControl from './BurgerControl/BurgerControl';

const control=[
    {label : "Salad", type:"salad"},
    {label : "Cheese", type:"cheese"},
    {label : "Meat", type:"meat"},
    {label : "Chicken", type:"chicken"},
    
]

const burgerControls = props =>(
    <div className={classes.BurgerControls}>
        <p>Current Price : {props.price}</p>
        {control.map(ctrl =>(
            <BurgerControl
             key={ctrl.label} 
             label={ctrl.label}
             addIng = {() => props.addIngredient(ctrl.type)}
             removeIng = {()=>props.removeIngredient(ctrl.type)}
             disabled={props.disabled[ctrl.type]} />
        ))}
    </div>
); 

export default burgerControls;