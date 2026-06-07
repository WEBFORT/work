// for (let i = 1; i <= 20; i++) {
// 	if (i % 4 === 0) {
// 		continue;
// 	}
// 	console.log(i);
// }
// const number = +prompt("Пожалуйста введите число:0")
// let factorial = 1;
// for ( i = 1; i <=number; i++) {
//     factorial = factorial *= i;
// }
// console.log(factorial)
let line ="";

for (let i =1; i <=8; i++) {
    for (let j =1; j <=8; j++) {
        line +=`# `
    }
    line +="\n"
}
console.log(line)