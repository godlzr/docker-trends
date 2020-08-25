import React, { useState } from 'react';
import { Table, Tag, Space } from 'antd';
import { DashboardTwoTone, FireTwoTone } from '@ant-design/icons';
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <a href={`https://hub.docker.com/search?q=${text}&type=image`} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
    },
    {
      title: `Downloads`,
      dataIndex: 'pulls',
      key: 'pulls',
    },
    {
      title: '',
      dataIndex: 'pulls',
      key: 'pulls',
      render: data => (
        <>
          <FireTwoTone twoToneColor={data > 10000000 ? 'red' : data > 10000 ? 'orange' : ''} />
        </>
      ),
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
      title: 'Size (the latest tag)',
      dataIndex: 'size',
      key: 'size',
      render: data => <>{`${data} MB `}</>,
    },
    {
      title: '',
      dataIndex: 'size',
      key: 'size',
      render: data => (
        <>
          <DashboardTwoTone twoToneColor={data < 100 ? '#52c41a' : data > 500 ? 'red' : ''} />
        </>
      ),
    },
  ];
  const data: any[] = [];
  console.log(imageData);

  imageData.forEach((image, ind) => {
    const archs = images[ind].architectures
      ? images[ind].architectures.sort((a, b) => {
          if (a.name > b.name) return 1;
          return -1;
        })
      : [];
    let size;
    try {
      size = (image.results[0].images[0].size / 1048576).toFixed(2);
    } catch (e) {
      console.warn('size not available');
    }
    data.push({
      key: ind,
      name: image.name,
      pulls: image.pull_count,
      stars: image.star_count,
      architectures: archs,
      updated: moment(image.last_updated).format('MMM Do YYYY'),
      size: size,
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
