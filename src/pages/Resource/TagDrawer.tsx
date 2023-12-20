import type { ModelType } from '@/models/common/model';
import type TagReferenceVo from '@/models/types';
import { Drawer } from 'antd';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';
import ResourceTags from './ResourceTag';

export interface TagDrawerPropsType {
  tagList: TagReferenceVo[];
  resourceId: string;
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
  const { resourceId, tagList, visible, onClose, renderTitle } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'resource/fetchTagList',
      payload: {
        resourceId: resourceId,
      },
    });
  }, [dispatch, resourceId]);

  return (
    <Drawer title={renderTitle} onClose={onClose} visible={visible} placement="right">
      <ResourceTags resourceId={resourceId} editable={true} tagList={tagList || []} />
    </Drawer>
  );
};

export default connect(({ resource: { tagList } }: ModelType) => ({
  tagList,
}))(TagDrawer);
