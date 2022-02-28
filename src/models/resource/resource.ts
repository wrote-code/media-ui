import { fetchResourceList } from '@/services/resource/resource';
import type { connect, Effect, Reducer } from 'umi';
import type { ResourceVo } from "../types";

export interface ResourceStateType {
  resourceList: ResourceVo[]
}

export interface ResourceModelType {
  namespace: 'resource',
  state: {
    resourceList: ResourceVo[],
  },
  effects: {
    fetchResourceList: Effect
  },
  reducer: {
    setResourceList: Reducer<resource.ResourceState>
  }
}

const ResourceMode: ResourceModelType = {
  namespace: 'resource',
  state: {
    resourceList: []
  },
  effects: {
    *fetchResourceList(_, {call, put}){
      const data = yield call(fetchResourceList);
      yield put({
        type: 'resource/setResourceList',
        payload: data
      })
    }
  },
  reducer: {
    setResourceList(state, { payload }) {
      return {
        ...state,
        resourceList: payload
      }
    }
  }
}

export default ResourceMode;
