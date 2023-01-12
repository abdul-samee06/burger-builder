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
        {control.map(ctrl =>(
            <BurgerControl key={ctrl.label} label={ctrl.label} />
        ))}
    </div>
); 

export default burgerControls;