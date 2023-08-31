import type { Effect, Reducer } from 'umi';
import type { Directory } from '@/models/types';
import { queryRootDirectory } from '@/services/select/directory';
import { parseResponse } from '@/utils/utils';

export interface DirectoryModelStateType {
  /**
   * 树的根节点数据。
   */
  treeData: Directory[];
  /**
   * 异步加载时后台返回的数据。
   */
  newTreeData: Directory[];
}

export interface DirectoryModelType {
  namespace: 'select/directory';
  state: DirectoryModelStateType;
  effects: {
    /**
     * 获取根目录，也就是level=1或level=0的目录。
     */
    queryRootDirectory: Effect;
  };
  reducers: {
    /**
     * 设置树形图数据。只在初始化时使用，之后使用异步加载。
     */
    setTreeData: Reducer;
    /**
     * 异步加载时，从后台拿到的数据通过此方法传给state。
     */
    setNewTreeData: Reducer;
  };
}

const DirectoryModel: DirectoryModelType = {
  namespace: 'select/directory',
  state: {
    newTreeData: [],
    treeData: [],
  },
  effects: {
    *queryRootDirectory({ payload }, { call, put }) {
      const response = yield call(queryRootDirectory, payload);
      if (parseResponse(response)) {
        yield put({
          type: 'setTreeData',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    setTreeData(state: DirectoryModelStateType, { payload }) {
      return {
        ...state,
        treeData: payload,
      };
    },
    setNewTreeData() {},
  },
};

export default DirectoryModel;
