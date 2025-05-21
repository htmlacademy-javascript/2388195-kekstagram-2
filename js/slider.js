const imgUploadForm = document.querySelector('.img-upload__form');
const imgPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');
const effectInput = imgUploadForm.querySelector('.effect-level__value');
const slider = imgUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');

const getChromeFilter = (value) => `grayscale(${value})`;
const getSepiaFilter = (value) => `sepia(${value})`;
const getMarvinFilter = (value) => `invert(${value}%)`;
const getPphobosFilter = (value) => `blur(${value}px)`;
const getHeatFilter = (value) => `brightness(${value})`;

const styleFilterByEffects = {
  chrome : getChromeFilter,
  sepia : getSepiaFilter,
  marvin : getMarvinFilter,
  phobos : getPphobosFilter,
  heat : getHeatFilter
};

const effects = {
  none : {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  chrome : {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },

  sepia :  {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },
  marvin :  {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos :  {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  },
  heat :   {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1
  }
};

const updateSliderOptions = (effect) => {
  slider.noUiSlider.updateOptions(effects[effect]);
};

const resetFilter = () => {
  sliderContainer.classList.add('hidden');
  imgPreview.style.filter = 'none';
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

sliderContainer.classList.add('hidden');

const onEffectButtonClick = (evt) => {
  const currentButton = evt.target.closest('.effects__radio');
  currentButton.checked = true;
  updateSliderOptions(currentButton.value);
  slider.noUiSlider.on('update', () => {
    effectInput.value = Number(slider.noUiSlider.get());
    if (currentButton.checked) {
      if(currentButton.value !== 'none') {
        sliderContainer.classList.remove('hidden');
        imgPreview.style.filter = styleFilterByEffects[currentButton.value](effectInput.value);
      } else {
        resetFilter();
      }
    }
  });
};

export {onEffectButtonClick, resetFilter};
