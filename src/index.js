import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  textLoader: document.querySelector('.loader'),
  textError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

//генератор options для breed-select
function createOptions(cats) {
  return cats.map(cat => {
    const option = document.createElement('option');
    option.textContent = cat.name;
    option.value = cat.id;
    return option;
  });
}

//завантаження котів при відкритті сторінки
fetchBreeds()
  .then(cats => {
    const options = createOptions(cats);
    refs.breedSelect.append(...options);

    new SlimSelect({
      select: refs.breedSelect,
    });

    refs.textLoader.classList.add('hidden');
    refs.breedSelect.classList.remove('hidden');
  })
  .catch(err => {
    refs.textLoader.classList.add('hidden');
    refs.textError.classList.remove('hidden');
    onError(err);
  });

//виклик fetchCatByBreed при виборі кота
function onChange() {
  refs.catInfo.classList.add('hidden');
  refs.textLoader.classList.remove('hidden');

  fetchCatByBreed(this.value)
    .then(res => {
      refs.catInfo.innerHTML = createMarkup(res);
      refs.catInfo.classList.remove('hidden');
      refs.textLoader.classList.add('hidden');
    })
    .catch(err => {
      refs.textLoader.classList.add('hidden');
      refs.textError.classList.remove('hidden');
      onError(err);
    });
}

refs.breedSelect.addEventListener('change', onChange);

//розмітка для кота
function createMarkup(arr) {
  return arr
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) => `
      <div class="img-container">
        <img src="${url}" alt="cat-${name}" />
        </div>
      <div class="text-container">
        <h1>${name}</h1>
        <p>${description}</p>
        <p><b>Temperament:</b> ${temperament}</p>
      </div>`
    )
    .join('');
}

//кастомне сповіщення
function onError(err) {
  Notify.failure(`❌${err}`);
}
