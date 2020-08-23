import React, { useState } from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import SearchBox from '../containers/searchbox';
import { GithubOutlined } from '@ant-design/icons';

import TagBar from '../containers/tagbar';
import ChartView from '../containers/chartview';
import StatView from '../containers/statview';
import { fetchImageData } from '../services/docker';

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
  return (
    <div className={styles.normal}>
      <h1>
        Docker Image Trends{' '}
        <a href="https://github.com/godlzr/docker-trends">
          <GithubOutlined />
        </a>
      </h1>
      <h2>Compare the free images</h2>
      <SearchBox addImage={addImage} />
      <TagBar images={images} removeImage={removeImage} />
      <ChartView imageData={imageData} />
      <StatView images={images} imageData={imageData} />
      <div className={styles.footer}>
        Made by <a href="https://github.com/godlzr">Zhongrui Li </a>
        Inspried by <a href="https://www.npmtrends.com/">npm trends</a>
      </div>
    </div>
  );
}
