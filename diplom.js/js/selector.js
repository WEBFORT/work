export default class selector {}
const customSelect = document.querySelector(".custom-select");
const selectHeader = customSelect.querySelector(".select-header");
const selectedValue = customSelect.querySelector(".selected-value");
const options = customSelect.querySelectorAll(".select-options li");

// Открытие/закрытие select
selectHeader.addEventListener("click", () => {
	customSelect.classList.toggle("active");
});

// Выбор варианта
options.forEach((option) => {
	option.addEventListener("click", () => {
		selectedValue.textContent = option.textContent;
		customSelect.classList.remove("active");
		// Здесь можно добавить обработку выбранного значения
		console.log("Выбрано:", option.dataset.value);
	});
});

// Закрытие при клике вне select
document.addEventListener("click", (e) => {
	if (!customSelect.contains(e.target)) {
		customSelect.classList.remove("active");
	}
});
