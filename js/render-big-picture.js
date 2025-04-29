import {isEscapeKey} from './util.js';
import {clearComments, renderComments} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

//закрыть BigPicture
function closeBigPicture() {//Function Declaration чтобы не ругался линтер
  clearComments();

  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
}

//открыть BigPicture
const openBigPicture = (currentPictureId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(currentPictureId));
  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeyDown);
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями позади не прокручивался
  // const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);//почему так работает?
  // bigPictureCloseButton.addEventListener('click', () => {
  //   closeBigPicture();
  // });
};


const renderBigPicture = (data) => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) =>
    item.addEventListener('click', (evt) => {
      evt.preventDefault(); //заблокирован переход по ссылке
      openBigPicture(item.dataset.id, data);

    })
  );
};

export {renderBigPicture};
