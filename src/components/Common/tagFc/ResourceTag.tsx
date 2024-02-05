import type TagReferenceVo from '@/types/entity';
import { Tag } from 'antd';
import React from 'react';
import { useDispatch } from 'umi';
import './resourceTag.css';

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
  editable?: boolean;
  resourceId?: string;
  totalCount?: number;
  /**
   * 标签数量大于5后，是否展示提示内容。
   */
  showMoreMessage?: boolean;
}

const ResourceTags: React.FC<ResourceTagPropsType> = (props: ResourceTagPropsType) => {
  const { tagList, editable, totalCount, resourceId, showMoreMessage } = props;
  const dispatch = useDispatch();

  const deleteTag = (tag: TagReferenceVo) => {
    dispatch({
      type: 'resource/deleteTag',
      payload: {
        resourceId: resourceId,
        referenceId: tag.id,
      },
    });
  };

  const renderUnEditableTag = () => {
    const leftCount = totalCount ? totalCount - 5 : -1;
    return (
      <React.Fragment>
        {tagList.map((tag, index) => {
          return (
            <Tag color={colorArray[index % 10]} key={tag.id} style={{ color: 'black' }}>
              {tag.tagVo?.name}
            </Tag>
          );
        })}
        {leftCount > 0 && showMoreMessage && <p>{`点击单元格查看剩余${leftCount}个标签`}</p>}
      </React.Fragment>
    );
  };

  const renderEditableTag = () => {
    const tagLength = tagList.length;
    return (
      <React.Fragment>
        {tagList.map((tag, index) => {
          return (
            <Tag
              color={colorArray[index % 10]}
              key={tag.id}
              style={{ color: 'black' }}
              closable={index < tagLength}
              onClose={() => deleteTag(tag)}
            >
              {tag.tagVo?.name}
            </Tag>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {editable && renderEditableTag()}
      {!editable && renderUnEditableTag()}
    </React.Fragment>
  );
};

export default ResourceTags;
