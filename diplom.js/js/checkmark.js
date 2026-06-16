export default class Checkmark {}

const button = document.querySelector(".selected-value");
const list = document.querySelector(".select-options");
const options = document.querySelectorAll("li");

button.addEventListener("click", () => {
	document
		.querySelector(".select-header")
		.classList.toggle("dropdown-active");
});

options.forEach((option) => {
	option.addEventListener("click", () => {
		options.forEach((opt) => opt.classList.remove("selected"));

		option.classList.add("selected");

		document
			.querySelector(".select-header")
			.classList.remove("dropdown-active");
	});
});
