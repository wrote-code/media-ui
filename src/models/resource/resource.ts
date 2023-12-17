import {
  addResource,
  deleteResource,
  fetchResourceList
} from '@/services/resource/resource';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect, Reducer } from 'umi';
import type TagReferenceVo from '../types';
import type { ResourceVo } from '../types';

export interface ResourceStateType {
  resourceList: ResourceVo[];
  /**
   * key=key1,key2,key3...，后面的数字是render时的索引。
   */
  tagReferenceVoMap: Record<string, TagReferenceVo[]>;
}

export interface ResourceModelType {
  namespace: 'resource';
  state: {
    resourceList: ResourceVo[];
    /**
     * key=key1,key2,key3...，后面的数字是render时的索引。
     */
    tagReferenceVoMap: Record<string, TagReferenceVo[]>;
  };
  effects: {
    fetchResourceList: Effect;
    addResource: Effect;
    deleteResource: Effect;
    deleteTag: Effect;
    addTag: Effect;
  };
  reducer: {
    setResourceList: Reducer<ResourceStateType>;
    setTagReferenceVoMap: Reducer<ResourceStateType>;
  };
}

const ResourceMode: ResourceModelType = {
  namespace: 'resource',
  state: {
    resourceList: [],
    tagReferenceVoMap: {},
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
    *deleteTag({ payload }, { call }) {},
    *addTag({ payload }, { call }) {},
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
