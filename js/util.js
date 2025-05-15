const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorContainer = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorContainer);

  setTimeout(() => {
    dataErrorContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {isEscapeKey, numDecline, showDataError};
