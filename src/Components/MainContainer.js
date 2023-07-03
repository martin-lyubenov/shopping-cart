
import classes from './MainContainer.module.css'

function MainContainer({ children }) {
  return <main className={classes.container}>{children}</main>;
}

export default MainContainer;
