import { Component } from "react";
import Aux from '../hoc/Auxiliary';
import Burger from '../components/Burger/Burger';
import BurgerControls from "../components/Burger/BurgerControls/BurgerControls";
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";


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
        purchaseable: false,
        purchasing: false,
    }


    purchaseCanceled=()=>{
        this.setState({
            purchasing : false
        });
    }

    purchaseContinue=()=>{
        alert("Continue to checkout");
    }


    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(keys => {
            return ingredients[keys];
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchaseable: sum > 0
        })
    };

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

        this.updatePurchaseState(updatedIngredients);
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

        this.updatePurchaseState(updatedIngredients);
    }


    render() {

        let disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.purchaseCanceled}>
                    <OrderSummary
                     ingredients={this.state.ingredients}
                     price={this.state.totalPrice}
                     purchaseContinued = {this.purchaseContinue}
                     purchaseCanceled = {this.purchaseCanceled} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}


export default BurgerBuilder;