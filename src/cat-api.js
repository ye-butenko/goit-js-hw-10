import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_MuPt8dG4mflTOmXaFS0wAyzTpbLsB1mhVdbJqugXxGaEWjPEWBdJh8LFM3BQq0fG';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const END_POINT = '/breeds';

  return axios
    .get(`${BASE_URL}${END_POINT}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios
    .get(`${BASE_URL}${END_POINT}?${params}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}
