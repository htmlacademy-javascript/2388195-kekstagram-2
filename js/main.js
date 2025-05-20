import {showDataError} from './notification.js';
import {renderBigPicture} from './render-big-picture.js';
import {renderImgEditor} from './img-upload-form.js';
import {getData} from './api.js';
import {configFilter} from './filter.js';

getData()
  .then((data) => {
    renderBigPicture(data);
    configFilter(data);
  })
  .catch((err) => {
    showDataError(err.message);
  });

renderImgEditor();

