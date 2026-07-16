export default class Filter {}

// Получаем элементы
const showMoreBtn = document.getElementById("MoreFilters");
const hiddenFilters = document.querySelector(".special-offers__header-delete");

// Добавляем обработчик события
showMoreBtn.addEventListener("click", function () {
	// Меняем стиль: скрываем кнопку и показываем фильтры
	hiddenFilters.style.display = "flex"; // или 'inline-block'
	showMoreBtn.style.display = "none"; // Скрываем кнопку после показа
});
