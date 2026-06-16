import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import selector from "./selector.js";
import Modal from "./modal.js";
import Button from "./button.js";
import Checkmark from "./checkmark.js";
import ReviewsCard from "./reviews-card.js";
import Slider from "./slider.js";
import Filter from "./filter.js";
import Card from "./card.js";
import { productSlider } from "./product-slider.js";


try {
	const headerFixed = new HeaderFixed({
		HEADER: "header",
		HEADER_FIXED: "header--fixed",
	});

	new BurgerMenu(
		{
			BURGER: "burger",
			BURGER_OPEN: "burger--open",
			HEADER_MENU: "header__menu",
			HEADER_MENU_OPEN: "header__menu--open",
			lABEL: {
				OPEN: "Открыть меню",
				CLOSE: "Закрыть меню",
			},
			PAGE_BODY: "page__body",
			PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
			MENU_LINK: "menu__link",
			BREAKPOINT: 768,
			MAIN: "main",
		},
		headerFixed
	);

	new Modal({
		PAGE_BODY: "page__body",
		PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
	});

	productSlider();
} catch (error) {
	console.error(error);
}