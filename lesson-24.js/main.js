//1 задача

// function calculateFinalPrice() {
//     const sum = 100 - (100 * 0.1) * 1.2;
//     console.log(sum)
// }

// calculateFinalPrice()

//2 задача

// const userName = prompt("Введите ваше имя");
// const password = prompt("Введите ваш пароль");
// function checkAccess(userName,password) {
// 	if (userName === "admin" && password === "123456") {
// 		console.log("Доступ разрешен");
// 	} else {
// 		console.log ("Доступ запрещен")
// 	}
// }

// checkAccess(userName,password)

//3 задача

// const getTimeOfDay = +prompt ("Введите время суток");
// function getTimeOfDay1(getTimeOfDay) {
// 	if (getTimeOfDay > 0 && getTimeOfDay <= 5) {
// 		console.log("Ночь")
// 	} else if (getTimeOfDay >= 6 && getTimeOfDay <= 11) {
// 		console.log("Утро")
// 	}else if (getTimeOfDay >= 12 && getTimeOfDay <= 17) {
// 		console.log("День")
// 	}else if (getTimeOfDay >= 18 && getTimeOfDay <= 23) {
// 		console.log("Вечер")
// 	}else {
// 		console.log(`"Некорректное время"`)
// 	}
// }

// getTimeOfDay1(getTimeOfDay)

//4 задача

const findFirstEven = (start, end) => {
	if (start > end) return "Некорректный диапазон";

	const findFirstEven = start % 2 === 0 ? start : start + 1;
	return findFirstEven <= end ? findFirstEven : "Четных чисел нет";
};
