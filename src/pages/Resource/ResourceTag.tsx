import TagReferenceVo, { ResourceVo } from '@/models/types';
import { Tag } from 'antd';
import React from 'react';

// 颜色数组，用于给标签着色
const colorArray = [
  '#ffa39e',
  '#ffa940',
  '#fff1b8',
  '#ffc53d',
  '#73d13d',
  '#5cdbd3',
  '#4096ff',
  '#b37feb',
  '#f759ab',
  '#ffd6e7',
];

export interface ResourceTagPropsType {
  tagList: TagReferenceVo[];
}

const ResourceTags: React.FC<ResourceTagPropsType> = (props: ResourceTagPropsType) => {
  const { tagList } = props;
  return (
    <React.Fragment>
      {tagList.map((tag, index) => {
        if (index >= 5) {
          return '';
        } else {
          return (
            <Tag color={colorArray[index % 10]} key={tag.id} style={{ color: 'black' }}>
              {tag.tagVo.name}
            </Tag>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ResourceTags;
