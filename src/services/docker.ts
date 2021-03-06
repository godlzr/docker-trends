import axios from 'axios';

const API_ROOT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin;

export function fetchImages(imageName: string, source = 'community', page = 1, perPage = 4) {
  if (source === 'official') {
    return axios.get(
      `https://hub.docker.com/api/content/v1/products/search?image_filter=official&q=${imageName}&page=${page}&page_size=${perPage}`,
      {
        headers: {
          Accept: 'application/json',
          'Search-Version': 'v3',
        },
      },
    );
  }
  return axios.get(
    `https://hub.docker.com/api/content/v1/products/search?source=community&q=${imageName}&page=${page}&page_size=${perPage}`,
    {
      headers: {
        Accept: 'application/json',
        'Search-Version': 'v3',
      },
    },
  );
}

export function fetchImageData(imageName: string, repo = 'library') {
  return axios.get(`${API_ROOT}/repositories/${repo}/${imageName}/`);
}
