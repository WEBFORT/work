export const productSlider = () => {
	new Swiper(".product__slider", {
		slidesPerView: "auto",
		centeredSlides: true,
		loop: false,
		mousewheel: {
			forceToAxis: true,
		},
		navigation: {
			prevEl: ".special-offers__slider-button--prev",
			nextEl: ".special-offers__slider-button--next",
		},
	});
};
