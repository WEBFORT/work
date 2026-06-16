export default class Slider {}

document.addEventListener("DOMContentLoaded", function () {
	const counterElement = document.getElementById("sliders");
	const slides = document.querySelectorAll(".special-offers__products");
	const prevArrow = document.querySelector(".special-offers__slider-button--prev");
	const nextArrow = document.querySelector(".special-offers__slider-button--next");
	const wrapper = document.querySelector(".swiper-wrapper");

	let currentSlide = 0;
	const totalSlides = slides.length;

	// Функция обновления счётчика
	function updateCounter() {
		counterElement.textContent = `${currentSlide + 1} из ${totalSlides}`;
	}

	// Прокрутка к текущему слайду
	function scrollToSlide(index) {
		const slideWidth = slides[0].offsetWidth + 15; // 15 — gap
		wrapper.scrollTo({
			left: slideWidth * index,
			behavior: "smooth",
		});
		currentSlide = index;
		updateCounter();
	}

	// Обработчики кликов
	prevArrow.addEventListener("click", () => {
		if (currentSlide > 0) {
			scrollToSlide(currentSlide - 1);
		}
	});

	nextArrow.addEventListener("click", () => {
		if (currentSlide < totalSlides - 1) {
			scrollToSlide(currentSlide + 1);
		}
	});

	// Инициализация
	updateCounter();
});
