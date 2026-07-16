export default class Button {}

const cards = document.querySelectorAll(".special-offers__number");

cards.forEach((card) => {
	const minusBtn = card.querySelector(".minus");
	const plusBtn = card.querySelector(".plus");
	const quantityDisplay = card.querySelector(".quantity-display");

	plusBtn.addEventListener("click", function () {
		quantityDisplay.innerText = parseInt(quantityDisplay.innerText) + 1;
	});

	minusBtn.addEventListener("click", function () {
		let currentValue = parseInt(quantityDisplay.innerText);
		if (currentValue > 1) {
			quantityDisplay.innerText = currentValue - 1;
		}
	});
});
