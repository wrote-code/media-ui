import type { ModelType } from '@/models/common/model';
import type TagReferenceVo from '@/models/types';
import type { TagVo } from '@/models/types';
import { Tag } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

export interface PropsType {
  resourceId: string;
  favoriteTagList: TagVo[];
  currentFavorite: TagReferenceVo | null;
}

const FavoriteTag: React.FC<PropsType> = (props: PropsType) => {
  const { favoriteTagList, resourceId, currentFavorite } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'tag/queryFavoriteTag',
      payload: {
        currentPate: 1,
        pageSize: 1,
        favourite: true,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: 'tag/queryCurrentFavorite',
      payload: {
        params: {
          currentPate: 1,
          pageSize: 10,
          resourceId: resourceId,
          favorite: true,
        },
      },
    });
  }, [dispatch, resourceId]);

  const toggleFavorite = () => {
    dispatch({
      type: 'tag/addFavorite',
      payload: {
        tagReferenceId: currentFavorite?.id,
        tagId: favoriteTagList[0].id,
        resourceId: resourceId,
      },
    });
  };

  return (
    <Tag color="#ff0000" onClick={toggleFavorite}>
      添加收藏
    </Tag>
  );
};

export default connect(({ tag: { favoriteTagList, currentFavorite } }: ModelType) => ({
  favoriteTagList,
  currentFavorite,
}))(FavoriteTag);
