import {isEscapeKey, KeyMessages} from './util.js';

const ALERT_SHOW_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showToastError = (errMessage) => {
  const dataErrorContainer = dataErrorTemplate.cloneNode(true);
  if (errMessage) {
    dataErrorContainer.querySelector('.data-error__title').textContent = errMessage;
  }
  document.body.append(dataErrorContainer);

  setTimeout(() => {
    dataErrorContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showDataError = () => {
  showToastError();
};

const showNotification = (element, cbKeyDown) => {
  const messageTemplate = document.querySelector(`#${element}`).content.querySelector(`.${element}`);
  const messageContainer = messageTemplate.cloneNode(true);
  const button = messageContainer.querySelector('button');
  document.body.append(messageContainer);
  document.body.classList.add('modal-open'); //чтобы контейнер с фотографиями не прокручивался

  function closeNotification (evt) {
    evt.stopPropagation();
    const hasElementTarget = [messageContainer, button].includes(evt.target); //(evt.target === messageContainer || evt.target === button)
    if (hasElementTarget || isEscapeKey(evt)) {
      messageContainer.remove();
      document.body.classList.remove('modal-open'); //чтобы контейнер с фотографиями прокручивался
      document.body.removeEventListener('keydown', closeNotification);
      document.body.removeEventListener('click', closeNotification);
      if (element === KeyMessages.Error) {
        document.addEventListener('keydown', cbKeyDown);
      }
    }
  }

  button.addEventListener('click', closeNotification);
  document.body.addEventListener('keydown', closeNotification);
  document.body.addEventListener('click', closeNotification);
};

export {showDataError, showNotification, showToastError};
