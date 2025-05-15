import {numDecline} from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';
const error = () => errorMessage;


const isHashtagValid = (value) => {
  // value = 0;
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if ((inputText.length === 0)) {
    return true;
  }

  const inputArray = inputText.split(/\s+/); //- \s - пробел, табуляция и прочее (+ - пробел 1 и более)

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')), //новый массив, в который копирует все элементы с индекса start до end (не включая end).
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хэштега ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_HASHTAGS} ${numDecline(
        MAX_HASHTAGS, 'хештега', 'хештегов', 'хештегов'
      )}`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)), // i-поиск не зависит от регистра: нет разницы между A и a
      error: 'Хэштег содержит недопустимые символы', //test(item) проверяет, есть ли хоть одно совпадение, если да, то возвращает true, иначе false.
    },
  ];

  if ((inputText.length === 0)) {
    return true;
  }

  return rules.every((rule) => { //return здесь чтобы обновлялось значение функции
    const isError = rule.check;
    if(isError) {
      errorMessage = rule.error;
    }
    return !isError;
  });
};

export {isHashtagValid, error};
