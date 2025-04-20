import {picturesContainer} from './render-thumbnails.js';
import {openBigPicture, closeBigPicture} from './render-big-picture.js';


const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault(); //заблокирован переход по ссылке
    openBigPicture(currentPicture.dataset.id);
  }
  // console.log(currentPicture.dataset.id);
});

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});
