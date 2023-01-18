import { Component } from "react";
import Aux from '../hoc/Auxiliary';
import Burger from '../components/Burger/Burger';
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import axios from '../axios-order';
import WithErrorHandler from "../hoc/WithErrorHandler/withErrorHandler";


const INGREDIENT_PRICE = {
    salad: 25,
    cheese: 50,
    meat: 150,
    chicken: 100
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 100,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        axios.get("/Ingredients.json")
            .then(response => (
                this.setState({ ingredients: response.data })
            )).catch(error =>{
                this.setState({error:true});
            });
    }


    purchaseCanceled = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinue = () => {

        this.setState({ loading: true })
        // alert("Continue to checkout");
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Abdul Samee",
                phoneNo: "789632145",
                address: "TestStreet123",
                email: "xoxo@luv2code.com"
            }
        };

        axios.post("/order.json", order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
                console.log(response);
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false });
                console.log(error);
            });
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

        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign:"center"}}>Ingredients can't load</p> : <Spinner />;

        

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredient}
                        removeIngredient={this.removeIngredient}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );


            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinue}
                purchaseCanceled={this.purchaseCanceled} />
        }



        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.purchaseCanceled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


export default WithErrorHandler(BurgerBuilder, axios);