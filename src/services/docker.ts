import axios from "axios";

export function fetchImages(
  imageName: string,
  source = "community",
  page = 1,
  perPage = 4,
) {
  return axios.get(
    `https://hub.docker.com/api/content/v1/products/search?source=${source}&q=${imageName}&page=${page}&page_size=${perPage}`,
  );
}

export function fetchImageData(imageName: string, repo = "library") {
  return axios.get(`http://localhost:3000/repositories/${repo}/${imageName}/`);
}
