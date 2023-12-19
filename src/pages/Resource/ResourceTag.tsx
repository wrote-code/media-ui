import type TagReferenceVo from '@/models/types';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag } from 'antd';
import React, { useRef, useState } from 'react';
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
  /**
   * 最多显示几个标签，没有传入时显示全部标签。
   */
  maxTagCount?: number;
}

const ResourceTags: React.FC<ResourceTagPropsType> = (props: ResourceTagPropsType) => {
  const { tagList, editable, resourceId, maxTagCount } = props;
  const [showInput, setShowInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const dispatch = useDispatch();
  const editInputRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const addNewTag = () => {
    setShowInput(false);
    dispatch({
      type: 'resource/addTag',
      payload: {
        resourceId,
        tagName: newTag,
      },
    });
    setNewTag('');
  };

  const deleteTag = (tag: TagReferenceVo) => {
    dispatch({
      type: 'resource/deleteTag',
      payload: {
        resourceId: tag.resourceId,
        referenceId: tag.id,
      },
    });
  };

  const renderUnEditableTag = () => {
    const tagCount = maxTagCount ?? 5;
    return (
      <React.Fragment>
        {tagList.map((tag, index) => {
          if (maxTagCount && index == tagCount) {
            return (
              <p key={tag.tagVo.id}>{`点击单元格查看剩余${tagList.length - tagCount}个标签`}</p>
            );
          } else if (index > tagCount) {
            return null;
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
              {tag.tagVo.name}
            </Tag>
          );
        })}
        {showInput && (
          <Input
            ref={editInputRef}
            onChange={handleInputChange}
            type="text"
            size="small"
            className="tag-input"
            value={newTag}
            onBlur={addNewTag}
            onPressEnter={addNewTag}
          />
        )}
        {!showInput && (
          <Tag key={0} className="site-tag-plus" onClick={() => setShowInput(true)}>
            <PlusOutlined /> 新标签
          </Tag>
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {editable && (
        <Input
          ref={editInputRef}
          onChange={handleInputChange}
          type="text"
          size="small"
          style={{ marginBottom: 5 }}
          value={newTag}
          onPressEnter={addNewTag}
        />
      )}
      {editable && renderEditableTag()}
      {!editable && renderUnEditableTag()}
    </>
  );
};

export default ResourceTags;
