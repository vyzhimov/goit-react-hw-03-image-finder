import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchPhotos = async (searchQuery, page) => {
  const response = await axios.get('/', {
    params: {
      q: searchQuery,
      page,
      key: '33863715-df25260fa40bd11fad8b98be3',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
