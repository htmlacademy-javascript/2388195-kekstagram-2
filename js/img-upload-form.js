import {isEscapeKey, KeyMessages} from './util.js';
import {showDataError, showNotification} from './notification.js';
import {onSmallerClick, onBiggerClick, resetScaleControl} from './scale-buttons.js';
import {isHashtagValid, error} from './is-hashtag-valid.js';
import {onEffectButtonClick, resetFilter} from './slider.js';
import {sendData} from './api.js';
import {renderImgPreview} from './img-preview-upload.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgEditor = imgUploadForm.querySelector('.img-upload__overlay');
const imgEditorCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const inputHashtags = imgUploadForm.querySelector('.text__hashtags');
const inputDescription = imgUploadForm.querySelector('.text__description');
const smallerScaleControl = imgUploadForm.querySelector('.scale__control--smaller');
const biggerScaleControl = imgUploadForm.querySelector('.scale__control--bigger');
const effectRadioButtons = imgUploadForm.querySelectorAll('.effects__radio');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуем...'
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

const blockSubmitButton = (isDisabled, buttonText) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = buttonText;
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(inputHashtags, isHashtagValid, error, 2, false);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    inputHashtags.value = inputHashtags.value.trim().replaceAll(/\s+/g, ' ');
    blockSubmitButton(true, SubmitButtonText.SENDING);
    sendData(new FormData(evt.target))
      .then(closeImgEditor)
      .then(() => showNotification(KeyMessages.SUCCESS, onDocumentKeyDown))
      .catch(
        (err) => {
          showDataError(err.message);
          document.removeEventListener('keydown', onDocumentKeyDown);
          showNotification(KeyMessages.ERROR, onDocumentKeyDown);
        }
      )
      .finally(() => blockSubmitButton(false, SubmitButtonText.IDLE));
  }
};

function openImgEditor() {
  imgEditor.classList.remove('hidden');
  renderImgPreview();
  document.body.classList.add('modal-open');
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
  document.body.classList.remove('modal-open');
  imgEditorCancelButton.removeEventListener('click', closeImgEditor);

  smallerScaleControl.removeEventListener('click', onSmallerClick);
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

export {renderImgEditor, onDocumentKeyDown, closeImgEditor};
