// import {photos} from './data.js';
import {showDataError} from './util.js';
import {renderThumbnail} from './render-thumbnails.js';
import {renderBigPicture} from './render-big-picture.js';
import {renderImgEditor} from './img-upload-form.js';
// import {getData, sendData} from './api.js';
import {getData} from './api.js';


// renderThumbnail(photos);
// renderBigPicture(photos);
// renderImgEditor();

getData()
  .then((data) => {
    renderThumbnail(data);
    renderBigPicture(data);
  })
  .catch((err) => {
    showDataError(err.message);
  });

renderImgEditor();
