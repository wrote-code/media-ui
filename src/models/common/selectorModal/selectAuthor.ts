import type { AuthorVo } from '@/models/types';
import { queryAuthorList } from '@/services/selectorModal';
import type { Effect, Reducer } from 'umi';

export interface SelectAuthorStateType {
  /**
   * 作者清单。modal自己查询后台。
   */
  authorList: AuthorVo[];
  /**
   * 作者总数量。
   */
  total: number;
}

interface SelectAuthorModelType {
  namespace: 'modal/selectAuthor';
  state: SelectAuthorStateType;
  effects: {
    /**
     * 查询当前页要展示的作者清单。
     */
    queryAuthorList: Effect;
  };
  reducers: {
    /**
     * 设置当前页要展示的作者清单。
     */
    setAuthorList: Reducer;
    /**
     * 设置总数。
     */
    setTotal: Reducer;
  };
}

const SelectAuthorModel: SelectAuthorModelType = {
  namespace: 'modal/selectAuthor',
  state: {
    authorList: [],
    total: 0,
  },
  effects: {
    *queryAuthorList({ payload }, { call, put }) {
      const data = yield call(queryAuthorList, payload);
      yield put({
        type: 'setAuthorList',
        payload: data.data,
      });
      yield put({
        type: 'setTotal',
        payload: data.total,
      });
    },
  },
  reducers: {
    setAuthorList(state: SelectAuthorStateType, { payload }) {
      return {
        ...state,
        authorList: payload,
      };
    },
    setTotal(state: SelectAuthorModelType, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
  },
};

export default SelectAuthorModel;
