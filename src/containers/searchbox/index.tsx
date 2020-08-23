import React, { useState } from 'react';
import { AutoComplete, Avatar, Tag } from 'antd';
import Icon, { UserOutline } from '@ant-design/icons';
import { fetchImages } from '../../services/docker';
import { SelectProps } from 'antd/es/select';

const renderTitle = (title: string, count: number) => {
  return (
    <div>
      <span>{title}</span>
      <span style={{ float: 'right' }}>{count} results</span>
    </div>
  );
};
const searchResult = async (keyword: string) => {
  const commnity = await fetchImages(keyword);
  const official = await fetchImages(keyword, 'official');
  const officialImages = official.data.summaries ? official.data.summaries : [];
  const commnityImages = commnity.data.summaries ? commnity.data.summaries : [];

  const opt = [
    {
      label: renderTitle('Official', official.data.count),
      options: officialImages.map((item: any) => {
        return {
          value: item.name,
          image: item,
          label: (
            <div>
              <span
                style={{
                  float: 'left',
                  marginRight: '1em',
                }}
              >
                {item.logo_url && (
                  <Avatar
                    src={
                      item.logo_url['small'] ||
                      item.logo_url['large'] ||
                      'https://hub.docker.com/favicon.ico'
                    }
                  />
                )}
              </span>
              <span
                style={{
                  float: 'left',
                }}
              >
                <p>{item.name}</p>
              </span>
              <span style={{ float: 'right' }}>{item.short_description}</span>
            </div>
          ),
        };
      }),
    },
    {
      label: renderTitle('Commnity', commnity.data.count),
      options: commnityImages.map((item: any) => {
        return {
          value: item.name,
          image: item,
          label: (
            <div>
              <span
                style={{
                  float: 'left',
                  marginRight: '1em',
                }}
              >
                {item.logo_url && <Avatar src={item.logo_url[Object.keys(item.logo_url)[0]]} />}
              </span>
              <span
                style={{
                  float: 'left',
                }}
              >
                {item.name}
              </span>
              <span style={{ float: 'right' }}>{item.short_description}</span>
            </div>
          ),
        };
      }),
    },
  ];

  return opt;
};
interface IProps {
  addImage: Function;
}
const SearchBox: React.FC<IProps> = ({ addImage }: IProps) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const onChange = async (keywords: any) => {
    setOptions(await searchResult(keywords));
  };
  const onSelect = (_: any, option: any) => {
    console.log(option);
    addImage(option.image);
  };
  return (
    <div>
      <AutoComplete
        style={{ width: '100%' }}
        placeholder="Input an image name to search"
        onChange={onChange}
        options={options}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SearchBox;
