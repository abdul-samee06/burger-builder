import { Component } from "react";
import Aux from '../hoc/Auxiliary';
import Burger from '../components/Burger/Burger';
import BurgerControls from "../components/Burger/BurgerControls/BurgerControls";


class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            cheese : 0,
            meat: 0,
            chicken : 0
        }
    }
    render(){
        return(
            <Aux>
                <Burger  ingredients={this.state.ingredients}/>
                <BurgerControls />
            </Aux>
        );
    }
}

export default BurgerBuilder;