import type { ModelType } from '@/models/common/model';
import type { TagVo } from '@/models/types';
import type TagReferenceVo from '@/models/types';
import { Tag } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

export interface PropsType {
  resourceId: string;
  /**
   * 当前评分。
   */
  currentRate: TagReferenceVo | null;
  /**
   * 评分列表，从后台获取，用来选然评分模板。
   */
  rateTagList: TagVo[];
}

const RateTag: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const { rateTagList, resourceId, currentRate } = props;

  useEffect(() => {
    // 查询评分模板。
    dispatch({
      type: 'tag/queryRateTagList',
      payload: {
        currentPate: 1,
        pageSize: 10,
        rate: true,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    // 查询当前资源的评分。
    dispatch({
      type: 'tag/queryTagReferenceList',
      payload: {
        currentPate: 1,
        pageSize: 10,
        resourceId: resourceId,
      },
    });
  }, [dispatch, resourceId]);

  const setRate = (rate: TagVo) => {
    dispatch({
      type: 'tag/addTag',
      payload: {
        resourceId,
        tagId: rate.id,
        tagReferenceId: currentRate?.id,
      },
    });
  };

  return (
    <React.Fragment>
      {rateTagList.map((tag) => {
        return tag.id == currentRate?.tagVo?.id ? (
          <Tag key={tag.id} onClick={() => setRate(tag)} color="#00ff00">
            {tag.name}
          </Tag>
        ) : (
          <Tag key={tag.id} onClick={() => setRate(tag)}>
            {tag.name}
          </Tag>
        );
      })}
    </React.Fragment>
  );
};

export default connect(({ tag: { rateTagList, currentRate } }: ModelType) => ({
  rateTagList,
  currentRate,
}))(RateTag);
