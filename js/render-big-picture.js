import {isEscapeKey} from './util.js';
import {photos} from './data.js';
import {clearComments, renderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//открыть BigPicture
const openBigPicture = (currentPictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(currentPictureId));
  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями позади не прокручивался
};

//закрыть BigPicture
const closeBigPicture = () => {
  clearComments();

  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
};

export {openBigPicture, closeBigPicture};
