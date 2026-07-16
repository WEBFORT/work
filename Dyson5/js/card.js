export default class Card {}

// Получаем элементы
const cards = document.querySelectorAll('.news__contents');
const showMoreBtn = document.getElementById('news__more');

// Количество карточек, видимых сразу
const initialVisible = 3;

// Флаг состояния (скрыты или показаны)
let areCardsShown = false;

// Обработчик клика
showMoreBtn.addEventListener('click', function() {
    // Меняем текст на кнопке в зависимости от состояния
    if (!areCardsShown) {
        showMoreBtn.textContent = 'Свернуть';
        areCardsShown = true;
    } else {
        showMoreBtn.textContent = 'Показать еще';
        areCardsShown = false;
    }

    // Проходим по всем карточкам
    cards.forEach((card, index) => {
        if (index >= initialVisible) {
            if (areCardsShown) {
                card.classList.remove('news__contents-delete'); // Показываем
            } else {
                card.classList.add('news__contents-delete'); // Скрываем
            }
        }
    });
});




