import { Component } from "react";
import Aux from '../hoc/Auxiliary';
import Burger from '../components/Burger/Burger';
import BurgerControls from "../components/Burger/BurgerControls/BurgerControls";


const INGREDIENT_PRICE = {
    salad: 25,
    cheese: 50,
    meat: 150,
    chicken: 100
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            chicken: 0,
        },
        totalPrice: 100,
    }

    addIngredient = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICE[type];

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }

    removeIngredient = (type) => {

        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) return;
        const updatedCount = oldCount - 1;

        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICE[type];

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
    }


    render() {

        let disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;