import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => (
  <>
    <header className={classes.header}>
      <h1>ReactMeals</h1>
      <HeaderCartButton />
    </header>
    <div className={classes["main-image"]}>
      <img src="meals.jpg" alt="" />
    </div>
  </>
);
export default Header;
