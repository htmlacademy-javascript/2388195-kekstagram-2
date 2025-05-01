import {isEscapeKey} from './util.js';
import {isHashtagValid, error} from './is-hashtag-valid.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditorCancelButton = imgUploadForm.querySelector('.img-upload__cancel');//#upload-cancell
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');

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

function openImgEditor() {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями не прокручивался
  document.addEventListener('keydown', onDocumentKeyDown);
  imgEditorCancelButton.addEventListener('click', closeImgEditor);
  inputHashtags.addEventListener('change', onHashtagInput);
  imgUploadForm.addEventListener('submit', onFormSubmit);
}

function closeImgEditor() {
  imgEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
  imgEditorCancelButton.removeEventListener('click', closeImgEditor);

  imgUploadForm.reset();
}

// pristine.addValidator(inputHashtags, (value) => {
//   const hasNumber = /\d/.test(value); //регулярное выражение /d - число  - есть ли число
//   return !hasNumber; //если true - ошибки нет
// }, 'нельзя использовать цифры');

pristine.addValidator(inputHashtags, isHashtagValid, error, 2, false);

pristine.addValidator(inputDescription, (value) => {
  const hasNumber = value.length <= 140 ;
  return hasNumber; //если true - ошибки нет
}, 'не более 140 символов');


imgUploadInput.addEventListener('change', openImgEditor);//change - возникает тогда, когда мы изменяем значение input.value
