import React from 'react'
import Logo from "../../Logo/Logo";
import classes from "./Sidedrawer.css";
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer, classes.Close]

    if(props.open){
        attachedClasses = [classes.Sidedrawer, classes.Open];
    }

    console.log(attachedClasses);

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>

            </div>
        </Aux>

    );
}

export default sidedrawer;
