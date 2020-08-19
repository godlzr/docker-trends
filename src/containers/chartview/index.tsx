import React, { useState } from "react";
import { GroupedBar } from "@ant-design/charts";

interface IProps {
  imageData: any[];
  removeImage: Function;
}

const ChartView: React.FC<IProps> = ({ imageData }: IProps) => {
  console.log(imageData);

  const data: any[] = [];
  imageData.map((img: any) => {
    data.push({ image: img.name, type: "downloads", value: img.pull_count });
    data.push({ image: img.name, type: "stars", value: img.star_count });
  });

  const config = {
    title: {
      visible: true,
      text: "download counts",
    },
    forceFit: true,
    data,
    groupField: "type",
    color: ["#1383ab", "#c52125"],
    xField: "value",
    yField: "image",
  };
  return <GroupedBar {...config} />;
};

export default ChartView;
