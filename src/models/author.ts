import type { AuthorVo } from './types';
import type { Effect, Reducer } from 'umi';
import { deleteAuthor, fetchAuthorList } from '@/services/author';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';

export interface AuthorStateType {
  authorList: AuthorVo[];
}

export interface AuthorModelType {
  namespace: 'author';
  state: AuthorStateType;
  effects: {
    fetchAuthorList: Effect;
    deleteAuthor: Effect;
  };
  reducers: {
    setAuthorList: Reducer<AuthorStateType>;
  };
}

const AuthorModel: AuthorModelType = {
  namespace: 'author',
  state: {
    authorList: [],
  },
  effects: {
    *fetchAuthorList({ payload }, { call, put }) {
      const response = yield call(fetchAuthorList, payload);
      if (parseResponse(response)) {
        yield put({
          type: 'setAuthorList',
          data: response.data,
        });
      }
    },
    *deleteAuthor({ payload }, { call }) {
      const response = yield call(deleteAuthor, payload);
      if (parseResponse(response)) {
        message.info('删除成功，请刷新页面');
      }
    },
  },
  reducers: {
    setAuthorList(state, { payload }) {
      return {
        ...state,
        authorList: payload,
      };
    },
  },
};

export default AuthorModel;
