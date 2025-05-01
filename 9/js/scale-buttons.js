const imgUploadForm = document.querySelector('.img-upload__form');
const valueScaleControl = imgUploadForm.querySelector('.scale__control--value');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');

const SCALE_STEP = 0.25;
const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 1;
let scaleValue = 1;

const onSmallerClick = () => {
  scaleValue -= SCALE_STEP;
  if (scaleValue < MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }
  valueScaleControl.value = `${scaleValue * 100}%`;
  imgPreview.style.transform = `scale(${scaleValue})`;
};

const onBiggerClick = () => {
  scaleValue += SCALE_STEP;
  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }
  valueScaleControl.value = `${scaleValue * 100}%`;
  imgPreview.style.transform = `scale(${scaleValue})`;
};

export {onSmallerClick, onBiggerClick};
