import axios from 'axios';

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
  );
}

export function fetchImageData(imageName: string, repo = 'library') {
  return axios.get(`${window.location.origin}/repositories/${repo}/${imageName}/`);
}
