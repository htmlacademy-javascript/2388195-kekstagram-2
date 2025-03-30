import {getRandomPositiveInteger, getRandomArrayElement} from './util.js';
import {getDataCreatePhotoDescriptions} from './data-for-create-photo-descriptions.js';

const {COMMENTS, DESCRIPTIONS, NAMES} = getDataCreatePhotoDescriptions();

const SIMILAR_PHOTO_COUNT = 25;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENTS = 0;
const MAX_NUMBER_COMMENTS = 30;
const MIN_IMG_NUMBER = 1;
const MAX_IMG_NUMBER = 6;

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

const createPhotoDescriptions = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhoto);

export {createPhotoDescriptions};
