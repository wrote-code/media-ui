import type { ModelType } from '@/models/common/model';
import type { TagVo } from '@/models/types';
import type { CSSProperties } from 'react';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

export interface PropsType {
  onClick: (tag: TagVo[]) => void;
  favorite: boolean;
  favoriteTagList: TagVo[];
}

const FavoriteTag: React.FC<PropsType> = (props: PropsType) => {
  const { onClick, favorite, favoriteTagList } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'tag/queryRateTagList',
      payload: {
        currentPate: 1,
        pageSize: 1,
        favourite: true,
      },
    });
  }, [dispatch]);

  const spanStyle: CSSProperties = {
    padding: 5,
    margin: 5,
    background: 'red',
    color: 'white',
    border: '1px solid grey',
    borderRadius: 5,
  };

  const favoriteStyle: CSSProperties = {
    ...spanStyle,
    background: 'lightgreen',
  };

  return (
    <span style={favorite ? favoriteStyle : spanStyle} onClick={() => onClick(favoriteTagList)}>
      收藏
    </span>
  );
};

export default connect(({ tag: { favoriteTagList } }: ModelType) => ({ favoriteTagList }))(
  FavoriteTag,
);
