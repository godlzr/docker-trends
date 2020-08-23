import React, { useState } from 'react';
import { Bar } from '@ant-design/charts';

interface IProps {
  imageData: any[];
}

const ChartView: React.FC<IProps> = ({ imageData }: IProps) => {
  if (imageData.length === 0) return <div />;
  const pullData: any[] = [];
  const starData: any[] = [];
  imageData.map((img: any) => {
    pullData.push({ image: img.name, type: 'downloads', downloads: img.pull_count });
    starData.push({ image: img.name, type: 'stars', stars: img.star_count });
  });

  const pullConfig = {
    forceFit: true,
    data: pullData,
    groupField: 'type',
    xField: 'downloads',
    yField: 'image',
  };
  const starConfig = {
    forceFit: true,
    data: starData,
    groupField: 'type',
    color: 'red',
    xField: 'stars',
    yField: 'image',
  };
  return (
    <div>
      <h2>Pulls</h2>
      <Bar {...pullConfig} />
      {/* <Bar {...starConfig} /> */}
    </div>
  );
};

export default ChartView;
