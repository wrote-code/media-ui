import type { ModelType } from '@/models/common/model';
import type TagReferenceVo from '@/models/types';
import { Drawer, Input, Tag } from 'antd';
import type { MouseEvent, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { TagModelType, connect, useDispatch } from 'umi';
import ResourceTags from './ResourceTag';
import type { TagVo } from '@/models/types';
import { debounce, throttle } from 'lodash';

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

export interface TagDrawerPropsType {
  /**
   * 当前资源拥有的标签。
   */
  tagList: TagReferenceVo[];
  /**
   * 模糊查询输入框输入内容。
   */
  dbTagList: TagVo[];
  resourceId: string;
  setVisible: (v: boolean) => void;
  visible: boolean;
  /**
   * 关闭时调用。
   */
  onClose: () => void;
  /**
   * 抽屉标题。
   */
  renderTitle?: ReactNode;
}

const TagDrawer: React.FC<TagDrawerPropsType> = (props) => {
  const { resourceId, tagList, visible, onClose, renderTitle, dbTagList, setVisible } = props;
  const [newTag, setNewTag] = useState('');
  const dispatch = useDispatch();
  const editInputRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: 'resource/fetchTagList',
      payload: {
        resourceId: resourceId,
      },
    });
  }, [dispatch, resourceId]);

  // todo 节流
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
    if (newTag.length == 0) {
      return;
    }
    dispatch({
      type: 'tag/queryTagList',
      payload: {
        name: newTag,
      },
    });
  };

  const addNewTag = () => {
    if (newTag.length == 0) {
      return;
    }
    dispatch({
      type: 'resource/addTag',
      payload: {
        resourceId,
        tagName: newTag,
      },
    });
    setNewTag('');
  };

  const addTagByClick = (e: MouseEvent, tag: TagVo) => {
    dispatch({
      type: 'resource/addTag',
      payload: {
        resourceId,
        tagName: tag.id,
      },
    });
  };

  const closeDrawer = () => {
    onClose();
    setVisible(false);
    dispatch({
      type: 'tag/setTagList',
      payload: [],
    });
  };

  /**
   * 选然searchTag查到的标签，点击标签可以为当前资源添加标签。
   */
  const renderTagArea = () => {
    return (
      <React.Fragment>
        {dbTagList.map((tag: TagVo, index: number) => {
          return (
            <Tag
              color={colorArray[index % 10]}
              onClick={(e) => {
                console.log(e.target);
              }}
              key={tag.id}
            >
              {tag.name}
            </Tag>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <Drawer title={renderTitle} onClose={closeDrawer} visible={visible} placement="right">
      <Input
        ref={editInputRef}
        onChange={handleInputChange}
        type="text"
        size="small"
        style={{ marginBottom: 5 }}
        value={newTag}
        onPressEnter={addNewTag}
      />
      <ResourceTags resourceId={resourceId} editable={true} tagList={tagList || []} />
      <p>匹配的标签：</p>
      {renderTagArea()}
    </Drawer>
  );
};

export default connect(({ resource: { tagList }, tag: { tagList: dbTagList } }: ModelType) => ({
  tagList,
  dbTagList,
}))(TagDrawer);
