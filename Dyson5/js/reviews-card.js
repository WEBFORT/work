export default class ReviewsCard {}

document.addEventListener("DOMContentLoaded", function () {
	const btn = document.getElementById("reviews__more");
	const hiddenCards = document.querySelectorAll(".reviews__comment.reviews__comment-delete"); // Скрытые карточки
	let isShown = false; // Флаг: показаны ли карточки

	btn.addEventListener("click", function () {
		if (!isShown) {
			// ПОКАЗАТЬ
			hiddenCards.forEach((card) => {
				card.classList.remove("reviews__comment-delete"); // Убираем класс скрытия
			});
			btn.textContent = "Скрыть"; // Меняем текст
			btn.classList.add("collapsed"); // Добавляем класс для стрелки вверх
		} else {
			// СКРЫТЬ
			hiddenCards.forEach((card) => {
				card.classList.add("reviews__comment-delete"); // Возвращаем класс скрытия
			});
			btn.textContent = "Показать еще"; // Возвращаем исходный текст
			btn.classList.remove("collapsed"); // Убираем зеркальное отражение
		}

		isShown = !isShown; // Инвертируем флаг
	});
});
