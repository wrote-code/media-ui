import { queryTagList } from '@/services/tag';
import { parseTableResponse } from '@/utils/utils';
import type { Effect, Reducer } from 'umi';
import type { ProTableObject, TagVo } from './types';

export interface TagStateType {
  /**
   * tag表查到的标签。
   */
  tagList: TagVo[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    queryTagList: Effect;
  };
  reducers: {
    setTagList: Reducer<TagStateType>;
  };
}

const model: TagModelType = {
  namespace: 'tag',
  state: {
    tagList: [],
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
  },
  reducers: {
    setTagList(state, { payload }) {
      return {
        ...state,
        tagList: payload,
      };
    },
  },
};

export default model;
