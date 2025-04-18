import {photos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const imgPicture = thumbnail.querySelector('.picture__img');
  imgPicture.src = photo.url;
  imgPicture.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.dataset.id = photo.id;
  return thumbnail;
};


photos.forEach((photo) => {
  const thumbnail = createThumbnail(photo);
  pictureFragment.appendChild(thumbnail);
});
picturesContainer.appendChild(pictureFragment);
// console.log(picturesContainer);
export {picturesContainer};
