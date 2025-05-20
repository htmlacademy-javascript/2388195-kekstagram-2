import {renderBigPicture} from './render-big-picture.js';
import {debounce} from './util.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED:'filter-discussed'
};

const SortFunction = {
  RANDOM: () => 0.5 - Math.random(),
  DISCUSSED: (a,b) => b.comments.length - a.comments.length
};

const MAX_PICTURE_COUNT = 10;

let currentFilter = Filter.DEFAULT;
let pictures = [];
const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const activeButtonClass = 'img-filters__button--active';
const debounceRender = debounce(renderBigPicture);


const applyFilter = () => {

  let filteredPictures = [];

  switch (currentFilter) {
    case `${Filter.DEFAULT}`:
      filteredPictures = pictures;
      break;

    case `${Filter.RANDOM}`:
      filteredPictures = pictures.toSorted(SortFunction.RANDOM).slice(0, MAX_PICTURE_COUNT);
      break;

    case `${Filter.DISCUSSED}`:
      filteredPictures = pictures.toSorted(SortFunction.DISCUSSED);
      break;
  }
  debounceRender(filteredPictures);
};


const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = filterContainer.querySelector(`.${activeButtonClass}`);
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(activeButtonClass);
  targetButton.classList.toggle(activeButtonClass);
  currentFilter = targetButton.getAttribute('id');
  applyFilter();
};

export const configFilter = (picturesData) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = picturesData;
  filterForm.addEventListener('click', onFilterChange);
};
