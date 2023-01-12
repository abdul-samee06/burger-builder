import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

const layout = (props) => (
  <Aux>
    <div>Toolar, SideDrawer, Backdrop</div>
    <main className={classes.Layout}>
        {props.children}
    </main>
  </Aux>

);

export default layout;
