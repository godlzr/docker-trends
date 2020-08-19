import React, { useState } from 'react';
import { AutoComplete, Avatar, Tag } from 'antd';
import Icon, { UserOutline } from '@ant-design/icons';
import hex from 'string-hex';

interface IProps {
  images: any[];
  removeImage: Function;
}

const colors = [
  'magenta',
  'blue',
  'red',
  'green',
  'volcano',
  'geekblue',
  'orange',
  'purple',
  'gold',
  'cyan',
];

const TagBar: React.FC<IProps> = ({ images, removeImage }: IProps) => {
  return (
    <div style={{ margin: '1em' }}>
      {images.map((img, ind) => {
        return (
          <span key={img}>
            <Tag
              style={{ fontSize: '13px' }}
              color={colors[ind]}
              closable
              onClose={() => removeImage(img)}
            >
              {img}
            </Tag>
          </span>
        );
      })}
    </div>
  );
};

export default TagBar;
