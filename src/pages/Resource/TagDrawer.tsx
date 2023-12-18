import type { ResourceModelType, ResourceStateType } from '@/models/resource/resource';
import type TagReferenceVo from '@/models/types';
import { Drawer } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';
import ResourceTags from './ResourceTag';
import type { ModelType } from '@/models/common/model';

export interface TagDrawerPropsType {
  tagList: TagReferenceVo[];
  resourceId: string;
  visible: boolean;
  /**
   * 关闭时调用。
   */
  onClose: () => void;
}

const TagDrawer: React.FC<TagDrawerPropsType> = (props) => {
  const { resourceId, tagList, visible, onClose } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'resource/fetchTagList',
      payload: {
        resourceId: resourceId,
      },
    });
  });

  return (
    <Drawer title="标签" onClose={onClose} visible={visible} placement="right">
      <ResourceTags tagList={tagList || []} />
    </Drawer>
  );
};

export default connect(({ resource: { tagList } }: ModelType) => ({
  tagList,
}))(TagDrawer);
