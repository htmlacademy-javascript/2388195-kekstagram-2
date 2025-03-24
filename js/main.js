const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Мороз и солнце; день чудесный!',
  'Навстречу северной Авроры',
  'Вечор, ты помнишь, вьюга злилась',
  'На мутном небе мгла носилась',
  'Луна, как бледное пятно',
  'Под голубыми небесами',
  'Великолепными коврами',
  'Блестя на солнце, снег лежит',
  'Прозрачный лес один чернеет',
  'И ель сквозь иней зеленеет',
  'И речка подо льдом блестит',
  'Вся комната янтарным блеском',
];

const NAMES = ['Николай', 'Аким', 'Ким', 'Харитон', 'Тимур', 'Степан'];

const SIMILAR_PHOTO_COUNT = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 30;
const MIN_IMG_NUMBER = 1;
const MAX_IMG_NUMBER = 6;


const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const createComment = (_, index) => ({
  id: index + 1,
  avatar: `img/avatar-${String(getRandomPositiveInteger(MIN_IMG_NUMBER, MAX_IMG_NUMBER))}.svg`,
  message: getRandomArrayElement(COMMENTS) + getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (_,index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
  comments: Array.from({length: getRandomPositiveInteger(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS)}, createComment),
});

const similarPhotoDescriptions = Array.from({length: SIMILAR_PHOTO_COUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(similarPhotoDescriptions);
