import type { AuthorVo } from './types';
import type { Effect, Reducer } from 'umi';
import { addAuthor, deleteAuthor, queryList } from '@/services/author';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';

export interface AuthorStateType {
  authorList: AuthorVo[];
}

export interface AuthorModelType {
  namespace: 'author';
  state: AuthorStateType;
  effects: {
    queryList: Effect;
    deleteAuthor: Effect;
    addAuthor: Effect;
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
    *queryList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
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
        message.success('删除成功，请刷新页面');
      }
    },
    *addAuthor({ payload }, { call }) {
      const response = yield call(addAuthor, payload);
      if (parseResponse(response)) {
        message.success('添加成功，请刷新页面');
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
