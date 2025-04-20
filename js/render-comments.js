const COUNT_SHOWCOMMENTS = 5;
let currentCount = 0;
let currentСomments = [];

const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

const shownCommentCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPicture.querySelector('.social__comment-total-count');
socialComments.innerHTML = '';

const renderNextComments = () => {
  const renderedComments = currentСomments.slice(currentCount, COUNT_SHOWCOMMENTS + currentCount);
  const renderedCommentsLength = renderedComments.length + currentCount;
  const commentsFragment = document.createDocumentFragment();

  renderedComments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = comment.avatar;
    commentTemplate.querySelector('.social__picture').alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentTemplate);
  });
  socialComments.appendChild(commentsFragment);

  shownCommentCount.textContent = renderedCommentsLength;
  totalCommentCount.textContent = currentСomments.length;

  if (renderedCommentsLength === currentСomments.length) {
    commentsLoaderButton.classList.add('hidden');
  }

  currentCount += COUNT_SHOWCOMMENTS;
};

const renderComments = (currentPhotoСomments) => {
  currentСomments = currentPhotoСomments;
  renderNextComments();
  commentsLoaderButton.addEventListener('click', renderNextComments);
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', renderNextComments);
};

export {clearComments, renderComments};

