import React from 'react'
import Aux from '../../../hoc/Auxiliary';

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
            <p>You want to checkout?</p>
        </Aux>
    )
};

export default orderSummary;