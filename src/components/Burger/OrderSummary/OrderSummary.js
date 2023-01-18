import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props =>{

    const summaryIngredients = Object.keys(props.ingredients)
                        .map(igKeys => { return (<li key={igKeys}>
                               {igKeys} : {props.ingredients[igKeys]}
                            </li>);
                        });

    return (
        <Aux>
            <h2>Your Order:</h2>
            <p>The delicious Burger with the ingredients :</p>
            <ul>
                {summaryIngredients}
            </ul>
            <strong> Total Price: Rs.{props.price}</strong>
            <p>You want to checkout?</p>
            <Button clicked={props.purchaseContinued} btnType="Success">Continue</Button>
            <Button clicked={props.purchaseCanceled} btnType="Danger">Cancel</Button>
        </Aux>
    )
};

export default orderSummary;