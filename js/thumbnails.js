import {createPhotoDescriptions} from './data.js';
const photos = createPhotoDescriptions();

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = templatePicture.cloneNode(true);
  const imgPicture = thumbnail.querySelector('.picture__img');
  imgPicture.src = photo.url;
  imgPicture.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.dataset.id = photo.id;
  return thumbnail;
};

const fragment = document.createDocumentFragment();
photos.forEach((photo) => {
  const thumbnail = createThumbnail(photo);
  fragment.appendChild(thumbnail);
});
picturesContainer.appendChild(fragment);
