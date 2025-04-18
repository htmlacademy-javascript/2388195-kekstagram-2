const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
socialComments.innerHTML = '';
// eslint-disable-next-line no-console
console.log(socialComment);

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP); //1) currentPhoto.comments от 0 инд до 5  - это мини массив
  //2) currentPhoto.comments от 5 инд до 10

  const renderedCommentsLength = renderedComments.length + currentCount; //1) 5 2) 10

  renderedComments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentTemplate);
  });
  socialComments.appendChild(commentsFragment); //1) 5 2) еще 5 = 10

  shownCommentCount.textContent = renderedCommentsLength; //5 2)10
  totalCommentCount.textContent = comments.length; //currentPhoto.comments.length

  if (renderedCommentsLength === comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }

  currentCount += COUNT_STEP; //5 2) 10
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments(); //5 комментов

  commentsLoaderButton.addEventListener('click', renderNextComments);
};

export {clearComments, renderComments};
// console.log('renderComments:', renderComments);


