const users = [
	{ name: "Alex", age: 24, isAdmin: false },
	{ name: "Bob", age: 13, isAdmin: false },
	{ name: "John", age: 31, isAdmin: true },
	{ name: "Jane", age: 20, isAdmin: false },
];

// users.push(
// 	{ name: "Ann", age: 19, isAdmin: false },
// 	{ name: "Jack", age: 43, isAdmin: true }
// );

// function getUserAverageAge(users) {
// 	if (users.length === 0) {
// 		return 0;
// 	}
// 	const sum = users.reduce((prev, users) => prev + users.age, 0);
// 	return sum / users.length;
// }

// console.log(getUserAverageAge(users))

// function getAllAdmins(users) {
// 	const admins = [];
// 	users.forEach((user) => {
// 		if (user.isAdmin) admins.push(user);
// 	});
// 	return admins;
// }

function first(arr, n) {
	const arrLength = arr.length;
	if (arrLength < n) {
		console.error(`${n} не может быть меньше длины массива: ${arrLength}`);
	}

	const newArr = [];
	for (let i = 0; i < n; i++) {
		newArr.push(arr[i]);
	}
	return newArr;
}

console.log(first([10, 15, 33, 50,], 10))
