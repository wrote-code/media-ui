import { Effect, Reducer } from 'umi';
import { fetchSiteVoListPro } from '@/services/site';
import { SiteVo } from './types';

export interface SiteStateType {
  siteList: SiteVo[];
}

interface SiteModelType {
  name: 'site';
  state: SiteStateType;
  effects: {
    fetchSiteVoListPro: Effect;
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
