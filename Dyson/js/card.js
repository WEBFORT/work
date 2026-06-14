export default class Card {}

const newsItems = [
	{
		title: "Есть ли безопасные выпрямители для волос",
		date: "21 декабря 2022",
		text: "Добавьте объем и рельеф коротким волосам...",
	},
];

let displayedItems = newsItems.slice(0, 3);

function renderNews() {
	const container = document.querySelector(".news-contents");
	container.innerHTML = ``;

	displayedItems.forEach((item) => {
		const cardHTML = `
    <article class="news__contents">
        <picture>
            <source srcset="./images/news-dyson.webp" />
            <img class="news__img" src="./images/news-dyson.png" alt="" />
        </picture>
        <p class="news__date description__xs">21 декабря 2022</p>
        <p class="news__title-new">
            Есть ли безопасные выпрямители для волос
        </p>
        <p class="news__description description__xs">
            Добавьте объем и рельеф коротким волосам. <br />Посмотрите, как
            создать мягкие, легкие локоны <br />и волны на коротких волосах
            и волосах средней длины.
        </p>
        <button class="news__details title__xs">Читать далее</button>
    </article>
    `;
		container.innerHTML += cardHTML;
	});
}

renderNews();

const showMoreBtn = document.querySelector(".news__details");

showMoreBtn.addEventListener("click", function () {
	const currentCount = displayedItems.length;
	const nextCount = currentCount + 3;

	const newItems = newsItems.slice(currentCount, nextCount);

	displayedItems = displayedItems.concat(newItems);

	renderNews();

	if (displayedItems.length >= newsItems.length) {
		showMoreBtn.style.display = "none";
	}
});
