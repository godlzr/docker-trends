import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import moment from 'moment';

interface IProps {
  images: any[];
  imageData: any[];
}

const colors = {
  ppc64le: 'magenta',
  arm64: 'blue',
  amd64: 'red',
  s390x: 'green',
  '386': 'volcano',
  arm: 'geekblue',
};

const StatView: React.FC<IProps> = ({ images, imageData }: IProps) => {
  if (imageData.length === 0) return <div />;
  const columns = [
    {
      title: 'Image Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <a link={`https://hub.docker.com/search?q=${text}&type=image`}>{text}</a>
      ),
    },
    {
      title: 'Downloads',
      dataIndex: 'pulls',
      key: 'pulls',
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
    },
    {
      title: 'Architectures',
      key: 'architectures',
      dataIndex: 'architectures',
      render: data => (
        <>
          {data.map(tag => {
            return (
              <Tag color={colors[tag.name]} key={tag.name}>
                {tag.label}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
    },
    {
      title: 'Size (may not accurate)',
      dataIndex: 'size',
      key: 'size',
    },
  ];
  console.log(imageData);
  const data: any[] = [];
  imageData.forEach((image, ind) => {
    const archs = images[ind].architectures.sort((a, b) => {
      if (a.name > b.name) return 1;
      return -1;
    });
    const size = (image.results[0].images[0].size / 1048576).toFixed(2);
    data.push({
      key: ind,
      name: image.name,
      pulls: image.pull_count,
      stars: image.star_count,
      architectures: archs,
      updated: moment(image.last_updated).format('MMM Do YYYY'),
      size: `${size} MB`,
    });
  });
  return (
    <div style={{ position: 'relative' }}>
      <h2>Stats</h2>
      <Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
    </div>
  );
};

export default StatView;
