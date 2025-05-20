import {numDecline} from './util.js';

const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';
const error = () => errorMessage;


const isHashtagValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if ((inputText.length === 0)) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэштег не может состоять из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
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
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэштег содержит недопустимые символы',
    },
  ];

  if ((inputText.length === 0)) {
    return true;
  }

  return rules.every((rule) => {
    const isError = rule.check;
    if(isError) {
      errorMessage = rule.error;
    }
    return !isError;
  });
};

export {isHashtagValid, error};
