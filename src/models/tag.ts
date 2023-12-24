import { addTag, queryTagList, queryTagReferenceList } from '@/services/tag';
import { parseResponse, parseTableResponse } from '@/utils/utils';
import type { Effect, Reducer } from 'umi';
import type TagReferenceVo from './types';
import type { ProTableObject, TagVo } from './types';
import type { TableResponse } from './types/response/table';

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
  currentRate: TagReferenceVo | null;
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    queryTagList: Effect;
    queryRateTagList: Effect;
    queryFavoriteTag: Effect;
    queryCurrentRate: Effect;
    addTag: Effect;
  };
  reducers: {
    setTagList: Reducer<TagStateType>;
    setRateTagList: Reducer<TagStateType>;
    setFavoriteTagList: Reducer<TagStateType>;
    setCurrentTagRef: Reducer<TagReferenceVo>;
  };
}

const model: TagModelType = {
  namespace: 'tag',
  state: {
    favoriteTagList: [],
    tagList: [],
    rateTagList: [],
    currentRate: null,
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
    *queryCurrentRate({ payload }, { call, put }) {
      const data: ProTableObject<TagReferenceVo> = yield call(queryTagReferenceList, payload);
      if (parseTableResponse(data)) {
        if (data?.data.length > 0) {
          yield put({
            type: 'setCurrentTagRef',
            payload: data.data[0],
          });
        }
      }
    },
    *addTag({ payload }, { call, put }) {
      const data: TableResponse<TagReferenceVo> = yield call(addTag, payload);
      if (parseResponse(data)) {
        yield put({
          type: 'setCurrentTagRef',
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
    setCurrentTagRef(state, { payload }) {
      return {
        ...state,
        currentRate: payload,
      };
    },
  },
};

export default model;
