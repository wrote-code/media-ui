import { queryTagList } from '@/services/tag';
import { parseTableResponse } from '@/utils/utils';
import type { Effect, Reducer } from 'umi';
import type { ProTableObject, TagVo } from './types';

export interface TagStateType {
  /**
   * tag表查到的标签。
   */
  tagList: TagVo[];
  /**
   * 评分标签。
   */
  rateTagList: TagVo[];
  /**
   * 用来标记收藏行为的标签。
   */
  favoriteTagList: TagVo[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    queryTagList: Effect;
    queryRateTagList: Effect;
    queryFavoriteTag: Effect;
  };
  reducers: {
    setTagList: Reducer<TagStateType>;
    setRateTagList: Reducer<TagStateType>;
    setFavoriteTagList: Reducer<TagStateType>;
  };
}

const model: TagModelType = {
  namespace: 'tag',
  state: {
    favoriteTagList: [],
    tagList: [],
    rateTagList: [],
  },
  effects: {
    *queryTagList({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setTagList',
          payload: data.data,
        });
      }
    },
    *queryRateTagList({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setRateTagList',
          payload: data.data,
        });
      }
    },
    *queryFavoriteTag({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setFavoriteTagList',
          payload: data.data,
        });
      }
    },
  },
  reducers: {
    setTagList(state, { payload }) {
      return {
        ...state,
        tagList: payload,
      };
    },
    setRateTagList(state: TagStateType, { payload }) {
      return {
        ...state,
        rateTagList: payload,
      };
    },
    setFavoriteTagList(state: TagStateType, { payload }) {
      return {
        ...state,
        favoriteTagList: payload,
      };
    },
  },
};

export default model;
