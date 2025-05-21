const imgUploadForm = document.querySelector('.img-upload__form');
const valueScaleControl = imgUploadForm.querySelector('.scale__control--value');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');

const SCALE_STEP = 0.25;
const MIN_SCALE_VALUE = 0.25;
const MAX_SCALE_VALUE = 1;
const PERCENTAGE_MULTIPLIER = 100;
let scaleValue = 1;

const onSmallerClick = () => {
  scaleValue -= SCALE_STEP;
  if (scaleValue < MIN_SCALE_VALUE) {
    scaleValue = MIN_SCALE_VALUE;
  }
  valueScaleControl.value = `${scaleValue * PERCENTAGE_MULTIPLIER}%`;
  imgPreview.style.transform = `scale(${scaleValue})`;
};

const onBiggerClick = () => {
  scaleValue += SCALE_STEP;
  if (scaleValue > MAX_SCALE_VALUE) {
    scaleValue = MAX_SCALE_VALUE;
  }
  valueScaleControl.value = `${scaleValue * PERCENTAGE_MULTIPLIER}%`;
  imgPreview.style.transform = `scale(${scaleValue})`;
};

const resetScaleControl = () => {
  scaleValue = 1;
  valueScaleControl.value = `${MAX_SCALE_VALUE * PERCENTAGE_MULTIPLIER}%`;
  imgPreview.style.transform = `scale(${MAX_SCALE_VALUE})`;
};

export {onSmallerClick, onBiggerClick, resetScaleControl};
