import {showToastError} from './notification.js';
import {closeImgEditor} from './img-upload-form.js';

const FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');


const renderImgPreview = () => {
  const file = imgUploadInput.files[0];
  const matches = FILE_TYPES.includes(file.type);

  if (matches) {
    const previewImgUrl = URL.createObjectURL(file);
    preview.src = previewImgUrl;
    previewEffects.forEach((previewEffect) => {
      previewEffect.style.backgroundImage = `url(${previewImgUrl})`;
    });
  } else {
    closeImgEditor();
    showToastError('Неверный тип файла');
  }
};

export {renderImgPreview};
