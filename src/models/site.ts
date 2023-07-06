import { addSite, deleteSite, querySiteList } from '@/services/site';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect, Reducer } from 'umi';
import type { SiteVo } from './types';

export interface SiteStateType {
  siteList: SiteVo[];
  total: number;
}

export interface SiteModelType {
  namespace: 'site';
  state: SiteStateType;
  effects: {
    querySiteList: Effect;
    addSite: Effect;
    deleteSite: Effect;
  };
  reducers: {
    setSiteList: Reducer;
  };
}

const SiteModel: SiteModelType = {
  namespace: 'site',
  state: {
    siteList: [],
    total: 0,
  },
  effects: {
    *addSite({ payload }, { call }) {
      const data = yield call(addSite, payload);
      if (parseResponse(data)) {
        message.success('添加成功，请刷新页面查看结果');
      }
    },
    *querySiteList({ payload }, { call, put }) {
      const data = yield call(querySiteList, payload);
      yield put({
        type: 'setSiteList',
        payload: data,
      });
    },
    *deleteSite({ payload }, { call }) {
      const response = yield call(deleteSite, payload);
      if (parseResponse(response)) {
        message.success('删除成功，请刷新页面');
      }
    },
  },
  reducers: {
    setSiteList(state, { payload }) {
      return {
        ...state,
        siteList: payload.data,
        total: payload.total,
      };
    },
  },
};

export default SiteModel;
