import type { Effect, Reducer } from 'umi';
import { addSite, fetchSiteVoListPro } from '@/services/site';
import type { SiteVo } from './types';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';

export interface SiteStateType {
  siteList: SiteVo[];
}

interface SiteModelType {
  name: 'site';
  state: SiteStateType;
  effects: {
    fetchSiteVoListPro: Effect;
    addSite: Effect;
  };
  reducers: {
    setSiteList: Reducer;
  };
}

const SiteModel: SiteModelType = {
  name: 'site',
  state: {
    siteList: [],
  },
  effects: {
    *addSite({ payload }, { call, put }) {
      const data = yield call(addSite(payload));
      if (parseResponse(data)) {
        message.success('添加成功');
        // yield put({
        //   type: 'setSiteList',
        //   data: data.data.siteList,
        // });
      }
    },
    *fetchSiteVoListPro({ payload }, { call, put }) {
      const data = yield call(fetchSiteVoListPro(payload));
      yield put({
        type: 'setSiteList',
        data: data,
      });
    },
  },
  reducers: {
    setSiteList(state, payload) {
      return {
        ...state,
        siteList: payload,
      };
    },
  },
};

export default SiteModel;
