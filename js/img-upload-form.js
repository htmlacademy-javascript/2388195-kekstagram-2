import {isEscapeKey} from './util.js';
import {onSmallerClick, onBiggerClick} from './scale-buttons.js';
import {isHashtagValid, error} from './is-hashtag-valid.js';
import {onEffectButtonClick, resetFilter} from './slider.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditorCancelButton = imgUploadForm.querySelector('.img-upload__cancel');//#upload-cancell
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');
const smallerScaleControl = imgUploadForm.querySelector('.scale__control--smaller');
const biggerScaleControl = imgUploadForm.querySelector('.scale__control--bigger');
const effectRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');


const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === inputHashtags || document.activeElement === inputDescription) {
      evt.stopPropagation();
    } else {
      closeImgEditor();
    }
  }
};

const onHashtagInput = () => {
  isHashtagValid(inputHashtags.value);
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' '); //С g флагом поиск ищет все совпадения, без него – только первое.
    imgUploadForm.submit();
  }
};

pristine.addValidator(inputHashtags, isHashtagValid, error, 2, false);

pristine.addValidator(inputDescription, (value) => {
  const hasNumber = value.length <= 140 ;
  return hasNumber; //если true - ошибки нет
}, 'не более 140 символов');

function openImgEditor() {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями не прокручивался
  document.addEventListener('keydown', onDocumentKeyDown);
  imgEditorCancelButton.addEventListener('click', closeImgEditor);

  smallerScaleControl.addEventListener('click', onSmallerClick);
  biggerScaleControl.addEventListener('click', onBiggerClick);

  effectRadioButtons.forEach((button) => {
    button.addEventListener('click', onEffectButtonClick);
  });

  inputHashtags.addEventListener('change', onHashtagInput);
  imgUploadForm.addEventListener('submit', onFormSubmit);
}

function closeImgEditor() {
  imgEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
  imgEditorCancelButton.removeEventListener('click', closeImgEditor);

  smallerScaleControl.removeEventListener('click', onSmallerClick);//Нужно ли удалять обработчики, если это всё упаковали в функцию? (т.к. в DevTools я не вижу эти обработчики)
  biggerScaleControl.removeEventListener('click', onBiggerClick);

  effectRadioButtons.forEach((button) => {
    button.removeEventListener('click', onEffectButtonClick);
  });

  inputHashtags.removeEventListener('change', onHashtagInput);
  imgUploadForm.removeEventListener('submit', onFormSubmit);

  pristine.reset();
  imgUploadForm.reset();
  resetFilter();
}


const renderImgEditor = () => {
  imgUploadInput.addEventListener('change', openImgEditor);
};

export {renderImgEditor};
