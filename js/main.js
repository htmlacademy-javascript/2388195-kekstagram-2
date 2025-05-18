import {showDataError} from './notification.js';
import {renderThumbnail} from './render-thumbnails.js';
import {renderBigPicture} from './render-big-picture.js';
import {renderImgEditor} from './img-upload-form.js';
import {getData} from './api.js';

getData()
  .then((data) => {
    renderThumbnail(data);
    renderBigPicture(data);
  })
  .catch((err) => {
    showDataError(err.message);
  });

renderImgEditor();
