import {isEscapeKey} from './util.js';
import {onDocumentKeyDown} from './img-upload-form.js';

const ALERT_SHOW_TIME = 5000;

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorContainer = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorContainer);

  setTimeout(() => {
    dataErrorContainer.remove();
  }, ALERT_SHOW_TIME);
};

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


export {showDataError, showSuccessMessage, showErrorMessage};
