import {
  addResource,
  deleteResource,
  fetchResourceList,
  queryTags,
} from '@/services/resource/resource';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect, Reducer } from 'umi';
import type TagReferenceVo from '../types';
import type { ResourceVo } from '../types';

export interface ResourceStateType {
  resourceList: ResourceVo[];
  tagList: TagReferenceVo[];
}

export interface ResourceModelType {
  namespace: 'resource';
  state: {
    resourceList: ResourceVo[];
    tagList: TagReferenceVo[];
  };
  effects: {
    fetchResourceList: Effect;
    addResource: Effect;
    deleteResource: Effect;
    deleteTag: Effect;
    addTag: Effect;
    fetchTagList: Effect;
  };
  reducers: {
    setResourceList: Reducer<ResourceStateType>;
    setTagList: Reducer<ResourceStateType>;
  };
}

const ResourceMode: ResourceModelType = {
  namespace: 'resource',
  state: {
    resourceList: [],
    tagList: [],
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
    *fetchTagList({ payload }, { call, put }) {
      const data = yield call(queryTags, payload);
      if (parseResponse(data)) {
        yield put({
          type: 'setTagList',
          payload: data.data,
        });
      }
    },
    *deleteTag({ payload }, { call }) {},
    *addTag({ payload }, { call }) {},
  },
  reducers: {
    setResourceList(state, { payload }) {
      return {
        ...state,
        resourceList: payload,
      };
    },
    setTagList(state, { payload }) {
      return {
        ...state,
        tagList: payload,
      };
    },
  },
};

export default ResourceMode;
