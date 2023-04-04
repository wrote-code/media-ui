import { addResource, deleteResource, fetchResourceList } from '@/services/resource/resource';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect, Reducer } from 'umi';
import type { ResourceVo } from '../types';

export interface ResourceStateType {
  resourceList: ResourceVo[];
}

export interface ResourceModelType {
  namespace: 'resource';
  state: {
    resourceList: ResourceVo[];
  };
  effects: {
    fetchResourceList: Effect;
    addResource: Effect;
    deleteResource: Effect;
  };
  reducer: {
    setResourceList: Reducer<ResourceStateType>;
  };
}

const ResourceMode: ResourceModelType = {
  namespace: 'resource',
  state: {
    resourceList: [],
  },
  effects: {
    *fetchResourceList(_, { call, put }) {
      const data = yield call(fetchResourceList);
      yield put({
        type: 'resource/setResourceList',
        payload: data,
      });
    },
    *addResource({ payload }, { call }) {
      const data = yield call(addResource, payload);
      if (parseResponse(data)) {
        message.success('添加成功, 请刷新页面后查看');
      }
    },
    *deleteResource({ payload }, { call }) {
      const data = yield call(deleteResource, payload);
      if (parseResponse(data)) {
        message.success('删除成功');
      }
    },
  },
  reducer: {
    setResourceList(state, { payload }) {
      return {
        ...state,
        resourceList: payload,
      };
    },
  },
};

export default ResourceMode;
