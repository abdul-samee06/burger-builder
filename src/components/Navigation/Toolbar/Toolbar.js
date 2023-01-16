import React from 'react'
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props =>{

    return (
        <div className={classes.Toolbar}>
            <div>MENU</div>
            <Logo />
            <NavigationItems/>
        </div>
    )
}

export default toolbar;