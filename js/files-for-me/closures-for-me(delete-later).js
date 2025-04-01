// function createIdGenerator () {
//   let lastGeneratedId = 0;

//   return function () {
//     lastGeneratedId += 1;
//     return lastGeneratedId;
//   };
// }

// const generatePhotoId = createIdGenerator();

// console.log(generatePhotoId()); // 1
// console.log(generatePhotoId()); // 2
// console.log(generatePhotoId()); // 3

//reduce///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//1


// const users = [
//   {id: 'john', name: 'John Smith', age: 20},
//   {id: 'ann', name: 'Ann Smith', age: 24},
//   {id: 'pete', name: 'Pete Peterson', age: 31},
// ];

// function groupById(array) {
//   return array.reduce((accumulator, element) => {
//     accumulator[element.id] = element;
//     return accumulator;
//   }, {});
// }

// console.log(groupById(users));


//2

// let vasya = { name: "Вася", age: 25 };
// let petya = { name: "Петя", age: 30 };
// let masha = { name: "Маша", age: 29 };

// let arr = [ vasya, petya, masha ];

//  // (25 + 30 + 29) / 3 = 28

// function getAverageAge(users) {
//   return users.reduce((accumulator, element) => accumulator + element.age, 0) / users.length;
// }
// alert(getAverageAge(arr));


//3

// const getRepeats = (array) => array.reduce((object, key) => {
//   // debugger
//   object[key] = (object[key] || 0) + 1;
//   return object;
// }, {});


// console.log(getRepeats(['Василий','Пётр','Иннокентий','Пётр','Иван','Василий']));


//Решение с forEach

// const array = ['Василий','Пётр','Иннокентий','Пётр','Иван','Василий'];

// // eslint-disable-next-line no-shadow
// const getRepeats = (array) => {
//   const object = {};
//   array.forEach((element) => {
//     object[element] = (object[element] || 0) + 1;
//     return object;
//   });
//   return object;
// };

// console.log(getRepeats(array));


///////////////////////////////////////////////////////////////////////////
//Разбор замыканий видео 5.17

// const getNumber = () => {
//   let number = 0;

//   return () => {
//     number += 1;
//     return number;
//   };
// };

// const count = getNumber();
// console.log(count());//1
// console.log(count());//2
// console.log(count());//3

// console.log(getNumber());
// //() => {
// //   number += 1;
// //   return number;
// // }
// console.log('getNumber()()', getNumber()());//1
// console.log('getNumber()()', getNumber()());//1


////////////////////////////////////////////////////////////////////////////


//Разбор генератора видео 5.17 время - 15:44
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const createRandomIdFromRangeGenerator = (min, max) => {
//   const previousValues = [];

//   return function () {
//     let currentValue = getRandomInteger(min, max);
//     if (previousValues.length >= (max - min + 1)) {
//       console.error('У меня больше нет уникальных значений!');
//       return null;
//     }
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomInteger(min, max);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// };

// const uniqId = createRandomIdFromRangeGenerator(0, 10);
// // uniqId();
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
// console.log(uniqId());
