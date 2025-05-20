import {showToastError} from './notification.js';
import {closeImgEditor} from './img-upload-form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');


export const renderImgPreview = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExtension);

  // Как проверить через file.type ?

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


