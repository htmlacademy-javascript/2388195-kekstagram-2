import {isEscapeKey, showDataError} from './util.js';
import {onSmallerClick, onBiggerClick, resetScaleControl} from './scale-buttons.js';
import {isHashtagValid, error} from './is-hashtag-valid.js';
import {onEffectButtonClick, resetFilter} from './slider.js';
import {sendData} from './api.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditorCancelButton = imgUploadForm.querySelector('.img-upload__cancel');//#upload-cancell
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');
const smallerScaleControl = imgUploadForm.querySelector('.scale__control--smaller');
const biggerScaleControl = imgUploadForm.querySelector('.scale__control--bigger');
const effectRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

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

// Блокировка кнопки Опубликовать
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(inputHashtags, isHashtagValid, error, 2, false);

//Перед защитой уберу:
// pristine.addValidator(inputDescription, (value) => {
//   const hasNumber = value.length <= 140 ;
//   return hasNumber; //если true - ошибки нет
// }, 'не более 140 символов');

const showSuccessMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageContainer = successMessageTemplate.cloneNode(true);
  const successButton = successMessageContainer.querySelector('.success__button');
  document.body.append(successMessageContainer);
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями не прокручивался
  const onSuccessButtonClick = () => {
    successMessageContainer.remove();
    document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
  };
  function onDocumentSuccessMessageKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessageContainer.remove();
      document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
      document.removeEventListener('keydown', onDocumentSuccessMessageKeyDown);
      document.removeEventListener('click', onOutsideSuccessMessageClick);
    }
  }

  function onOutsideSuccessMessageClick (evt) {
    const successInner = successMessageContainer.querySelector('.success__inner');
    const successInnerTitle = successMessageContainer.querySelector('.success__title');
    if (evt.target !== successInner && evt.target !== successInnerTitle) {
      successMessageContainer.remove();
      document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
      document.removeEventListener('keydown', onDocumentSuccessMessageKeyDown);
      document.removeEventListener('click', onOutsideSuccessMessageClick);
    }
  }

  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentSuccessMessageKeyDown);
  document.addEventListener('click', onOutsideSuccessMessageClick);
};


const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageContainer = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessageContainer.querySelector('.error__button');
  document.body.append(errorMessageContainer);
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями не прокручивался
  const onErrorButtonClick = () => {
    errorMessageContainer.remove();
    document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
    document.addEventListener('keydown', onDocumentKeyDown);
  };
  function onDocumentErrorMessageKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageContainer.remove();
      document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
      document.removeEventListener('keydown', onDocumentErrorMessageKeyDown);
      document.removeEventListener('click', onOutsideErrorMessageClick);
      document.addEventListener('keydown', onDocumentKeyDown);
    }
  }

  function onOutsideErrorMessageClick (evt) {
    const errorInner = errorMessageContainer.querySelector('.error__inner');
    const errorInnerTitle = errorMessageContainer.querySelector('.error__title');
    if (evt.target !== errorInner && evt.target !== errorInnerTitle) {
      errorMessageContainer.remove();
      document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
      document.removeEventListener('keydown', onDocumentErrorMessageKeyDown);
      document.removeEventListener('click', onOutsideErrorMessageClick);
      document.addEventListener('keydown', onDocumentKeyDown);
    }
  }

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentErrorMessageKeyDown);
  document.addEventListener('click', onOutsideErrorMessageClick);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' '); //С g флагом поиск ищет все совпадения, без него – только первое.
    blockSubmitButton();
    // imgUploadForm.submit();
    sendData(new FormData(evt.target))
      .then(closeImgEditor)
      .then(showSuccessMessage)
      // .then(closeImgEditor()) //еще раз в чем разница?
      .catch(
        (err) => {
          showDataError(err.message);
          document.removeEventListener('keydown', onDocumentKeyDown);
          showErrorMessage();
        }
      )
      .finally(unblockSubmitButton);
  }
};

// const setUserFormSubmit = (onSuccess) => {
//   imgUploadForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     if (pristine.validate()) {
//       inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' '); //С g флагом поиск ищет все совпадения, без него – только первое.
//       blockSubmitButton();
//       sendData(new FormData(evt.target))
//         .then(onSuccess)
//         .catch(
//           (err) => {
//             showDataError(err.message);
//           }
//         )
//         .finally(unblockSubmitButton);
//     }
//   });
// };


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
  // setUserFormSubmit(closeImgEditor);
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
  resetScaleControl();
}


const renderImgEditor = () => {
  imgUploadInput.addEventListener('change', openImgEditor);
};

export {renderImgEditor};
