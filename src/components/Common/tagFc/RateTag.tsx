import type { ModelType } from '@/models/common/model';
import type { TagVo } from '@/models/types';
import { useDebounceFn } from 'ahooks';
import type { CSSProperties, DOMAttributes} from 'react';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

export interface PropsType {
  /**
   * 设置评分。
   * @param rate 评分。
   */
  setRate: (rate: string) => void;
  /**
   * 评分，这里是标签主键。
   */
  rate: string;
  /**
   * 取消评分，功能待定。
   */
  unsetRate: () => void;
  /**
   * 评分列表，从后台获取，用来选然评分模板。
   */
  rateTagList: TagVo[];
}

const RateTag: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const { setRate, rate, unsetRate, rateTagList } = props;

  const setRateId = (data: TagVo) => {
    setRate(data.id);
  };

  const { run: unsetRateId } = useDebounceFn(
    () => {
      unsetRate();
    },
    { wait: 1000 },
  );

  // 待定
  unsetRate();

  useEffect(() => {
    dispatch({
      type: 'tag/queryRateTagList',
      payload: {
        currentPate: 1,
        pageSize: 10,
        rate: true,
      },
    });
  }, [dispatch]);

  const spanStyle: CSSProperties = {
    width: 5,
    height: 5,
    margin: 5,
    padding: 5,
    border: '1px grey solid',
    borderRadius: 5,
    color: 'white',
    backgroundColor: 'lightgreen',
  };

  const rateStyle: CSSProperties = {
    ...spanStyle,
    backgroundColor: 'green',
  };

  const spanProps: DOMAttributes<HTMLSpanElement> = {
    onFocus: unsetRateId,
  };

  return (
    <React.Fragment>
      {rateTagList.map((tag) => {
        return tag.id == rate ? (
          <span key={tag.id} {...spanProps} onClick={() => setRateId(tag)} style={rateStyle}>
            {tag.name}
          </span>
        ) : (
          <span key={tag.id} {...spanProps} onClick={() => setRateId(tag)} style={spanStyle}>
            {tag.name}
          </span>
        );
      })}
    </React.Fragment>
  );
};

export default connect(({ tag: { rateTagList } }: ModelType) => ({ rateTagList }))(RateTag);
