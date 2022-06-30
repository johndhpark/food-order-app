import React from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
	return (
		<React.Fragment>
			<div className={classes.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton />
			</div>
			<div className={classes["main-image"]}>
				<img src="meals.jpg" alt="" />
			</div>
		</React.Fragment>
	);
};

export default Header;
