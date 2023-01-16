import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';
import React, { Component } from 'react';


class Layout extends Component {

  state = {
    showBackdrop: false,
  }

  showBackdropHandler = () => {

    this.setState({
      showBackdrop: false,
    });
  }

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showBackdrop: !prevState.showBackdrop };
    });

  }


  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleHandler}  />
        <Sidedrawer closed={this.showBackdropHandler} open={this.state.showBackdrop} />
        <main className={classes.Layout}>
          {this.props.children}
        </main>
      </Aux>
    );

  }
}

export default Layout;
