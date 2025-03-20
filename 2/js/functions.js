// ЗАДАЧА 1

// Функция для проверки длины строки.
// Она принимает строку, которую нужно проверить,
// и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
// и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы.
// Примеры использования функции:

// // Строка короче 20 символов
// имяФункции('проверяемая строка', 20); // true
// // Длина строки ровно 18 символов
// имяФункции('проверяемая строка', 18); // true
// // Строка длиннее 10 символов
// имяФункции('проверяемая строка', 10); // false

// Что использовать?
// Для решения этой задачи вам потребуется объявить функцию с двумя параметрами: строкой и максимальной длиной.
// В теле функции используйте оператор сравнения меньше или равно (<=), чтобы сравнить длину полученной строки (свойство length)
// с максимальной длиной. Функция должна вернуть результат этого сравнения.

// Обратите внимание, что для решения этой задачи можно использовать if/else или тернарный оператор, однако это избыточно,
// так как операция сравнения сама по себе возвращает нужный нам результат.

// РЕШЕНИЕ:

const checkStringLength = (string = '', maxStringLength = 1) => string.length <= maxStringLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// ЗАДАЧА 2

// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
// Например:
// // Строка является палиндромом
// имяФункции('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
// имяФункции('ДовОд'); // true
// // Это не палиндром
// имяФункции('Кекс');  // false

// Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы.
// Они не должны учитываться при проверке!

// // Это палиндром
// имяФункции('Лёша на полке клопа нашёл '); // true

// РЕШЕНИЕ:

const isPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
};

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

// ------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

// Дополнительное задание
// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:

// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN


// Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.
// Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

// имяФункции(2023); // 2023
// имяФункции(-1);   // 1
// имяФункции(1.5);  // 15

// РЕШЕНИЕ:

const extractNumber = (string) => {
  string = string.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

extractNumber(2023);
extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);
