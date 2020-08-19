import React, { useState } from "react";
import styles from "./index.css";
import { formatMessage } from "umi-plugin-locale";
import SearchBox from "../containers/searchbox";
import TagBar from "../containers/tagbar";
import ChartView from "../containers/chartview";
import { fetchImageData } from "../services/docker";

export default function () {
  const [images, setImages] = useState<any>([]);
  const [imageData, setimageData] = useState<any>([]);

  const addImage = async (image: any) => {
    if (images.indexOf(image) === -1) {
      images.push(image);
      setImages(images.slice());
      let repo = "library";
      if (image.indexOf("/") > -1) {
        const tag = image.split("/");
        image = tag[1];
        repo = tag[0];
      }
      const resp = await fetchImageData(image, repo);
      const { data } = resp;
      const index = imageData.findIndex((d: any) => d.name === data.name);
      if (index === -1) {
        imageData.push(data);
        setimageData(imageData.slice());
      }
    }
  };

  const removeImage = (image: any) => {
    const index = images.indexOf(image);
    if (index > -1) {
      images.splice(index, 1);
      setImages(images.slice());
    }
  };

  return (
    <div className={styles.normal}>
      <h1>Docker Trends</h1>
      <SearchBox addImage={addImage} />
      <TagBar images={images} removeImage={removeImage} />
      <ChartView imageData={imageData} />
    </div>
  );
}
