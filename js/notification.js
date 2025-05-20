import {isEscapeKey, KeyMessages} from './util.js';

const ALERT_SHOW_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const body = document.body;

const showToastError = (errMessage) => {
  const dataErrorContainer = dataErrorTemplate.cloneNode(true);
  if (errMessage) {
    dataErrorContainer.querySelector('.data-error__title').textContent = errMessage;
  }
  body.append(dataErrorContainer);

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
  body.append(messageContainer);

  function closeNotification (evt) {
    evt.stopPropagation();
    const hasElementTarget = [messageContainer, button].includes(evt.target);
    if (hasElementTarget || isEscapeKey(evt)) {
      messageContainer.remove();
      body.removeEventListener('keydown', closeNotification);
      body.removeEventListener('click', closeNotification);
      if (element === KeyMessages.ERROR) {
        document.addEventListener('keydown', cbKeyDown);
      }
    }
  }

  button.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
  body.addEventListener('click', closeNotification);
};

export {showDataError, showNotification, showToastError};
