const number = 10;

if (number % 2 === 0) {
	console.log(number, "четное число");
} else {
	console.log(number, "не четное число");
}

// const age = 17;
// const discount = age < 18 ? 10 : age <= 65 ? 20 : 30;
// console.log(discount)
// const age = 40;
// if (age < 18) {
// 	console.log(`скидка${10}%`);
// } else if (age <= 65) {
// 	console.log(`скидка${20}%`);
// } else if (age > 65) {
// 	console.log(`скидка${30}%`);
// } else {
// 	console.log("что-то пошло не так");
// }
const age = 17;
switch (true) {
	case age < 18:
		console.log(10);
		break;
	case age <= 65:
		console.log(20);
		break;
	default:
		console.log(30);
}

const userName = +prompt("Введите имя пользователя (admin или user):");
const password = +prompt("Введите пароль (123456):");

switch (userName) {
	case (userName === "admin" || userName === "user") && password === "123456":
		console.log("Доступ разрешен");
		break;
	default:
		console.log("Доступ запрещен");
		break;
}

// const weight = +prompt("Введите вес посылки (в кг):");
// const rate = +prompt(
// 	"Выберите желаемый тариф доставки (Стандарт, Экспресс, премиум):"
// );
// switch(weight) {
//     case (weight === 0):
//         console.log("Некорректный вес посылки");
//         break;
// }