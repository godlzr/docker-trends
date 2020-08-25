import React, { useState } from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import SearchBox from '../containers/searchbox';
import Icon, { GithubOutlined } from '@ant-design/icons';

import TagBar from '../containers/tagbar';
import ChartView from '../containers/chartview';
import StatView from '../containers/statview';
import { fetchImageData } from '../services/docker';

const DockerSvg = () => (
  <svg
    t="1598324127862"
    class="icon"
    viewBox="0 0 1280 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1754"
    width="30"
    height="30"
    fill="currentColor"
  >
    <path
      d="M699.88718 472.6h-132.2v-118.8h132.2v118.8z m0-408.6h-132.2v121.4h132.2V64z m156.4 289.6H724.08718v118.8h132.2v-118.8z m-312.6-144.2h-132.2v120.2h132.2v-120.2z m156.2 0h-132.2v120.2h132.2v-120.2z m553.6 200c-28.8-19.4-95.2-26.4-146.2-16.8-6.6-48-33.4-89.8-82.2-127.4l-28-18.6-18.6 28c-36.8 55.6-46.8 147.2-7.4 207.6-17.4 9.4-51.6 22.2-96.8 21.4H4.88718c-17.4 101.6 11.6 233.6 88 324.2 74.2 87.8 185.4 132.4 330.8 132.4 314.8 0 547.8-145 656.8-408.4 42.8 0.8 135.2 0.2 182.6-90.4 3-5 13.2-26.4 17-34.2l-26.6-17.8z m-1022.2-55.8h-132v118.8h132.2v-118.8z m156.2 0h-132.2v118.8h132.2v-118.8z m156.2 0h-132.2v118.8h132.2v-118.8z m-156.2-144.2h-132.2v120.2h132.2v-120.2z"
      p-id="1755"
      data-spm-anchor-id="a313x.7781069.0.i0"
      class="selected"
    ></path>
  </svg>
);

export default function() {
  const [images, setImages] = useState<any>([]);
  const [imageData, setimageData] = useState<any>([]);

  const addImage = async (image: any) => {
    const index = images.findIndex(img => img.name === image.name);
    if (index === -1) {
      images.push(image);
      setImages(images.slice());

      let repo = 'library';
      let slug = image.slug;
      if (image.name.indexOf('/') > -1) {
        const tag = image.name.split('/');
        repo = tag[0];
        slug = tag[1];
      }
      const resp = await fetchImageData(slug, repo);
      const { data } = resp;
      const index = imageData.findIndex((d: any) => d.name === data.name);
      if (index === -1) {
        imageData.push(data);
        setimageData(imageData.slice());
      }
    }
  };

  const removeImage = (image: any) => {
    const index = images.findIndex(img => img.name === image.name);
    if (index > -1) {
      images.splice(index, 1);
      setImages(images.slice());
      imageData.splice(index, 1);
      setimageData(imageData.slice());
    }
  };
  const DockerIcon = props => <Icon component={DockerSvg} {...props} />;

  return (
    <div className={styles.normal}>
      <div className={styles.content}>
        <h1>
          Container Image Trends{' '}
          <a href="https://github.com/godlzr/docker-trends" target="_blank">
            <GithubOutlined />
          </a>
        </h1>
        <h2>Compare the free images</h2>
        <SearchBox addImage={addImage} />
        <TagBar images={images} removeImage={removeImage} />
        <ChartView imageData={imageData} />
        <StatView images={images} imageData={imageData} />
      </div>
      <div className={styles.footer}>
        Made by{' '}
        <a href="https://github.com/godlzr" target="_blank">
          Zhongrui Li{' '}
        </a>
        Inspried by{' '}
        <a href="https://www.npmtrends.com" target="_blank">
          npm trends{' '}
        </a>
        Data pulled from{' '}
        <a href="https://hub.docker.com" target="_blank">
          dockerhub <DockerIcon style={{ color: '#0db7ed' }} />
        </a>
      </div>
    </div>
  );
}
