import {photos} from './data.js';
import {renderThumbnail} from './render-thumbnails.js';
import {renderBigPicture} from './render-big-picture.js';
import {renderImgEditor} from './img-upload-form.js';

renderThumbnail(photos);
renderBigPicture(photos);
renderImgEditor();
