import { addSite, deleteSite, fetchSiteVoListPro } from '@/services/site';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect, Reducer } from 'umi';
import type { SiteVo } from './types';

export interface SiteStateType {
  siteList: SiteVo[];
}

export interface SiteModelType {
  namespace: 'site';
  state: SiteStateType;
  effects: {
    fetchSiteVoListPro: Effect;
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
  },
  effects: {
    *addSite({ payload }, { call }) {
      const data = yield call(addSite, payload);
      if (parseResponse(data)) {
        message.success('添加成功，请刷新页面查看结果');
      }
    },
    *fetchSiteVoListPro({ payload }, { call, put }) {
      const data = yield call(fetchSiteVoListPro, payload);
      yield put({
        type: 'setSiteList',
        payload: data.data,
      });
    },
    *deleteSite({ payload }, { call, put }) {
      const response = yield call(deleteSite, payload);
      if (parseResponse(response)) {
        message.info('删除成功，请刷新页面');
      }
    },
  },
  reducers: {
    setSiteList(state, { payload }) {
      return {
        ...state,
        siteList: payload,
      };
    },
  },
};

export default SiteModel;
