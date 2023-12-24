import { addTag, queryTagList, queryTagReferenceList } from '@/services/tag';
import { parseResponse, parseTableResponse } from '@/utils/utils';
import type { Effect, Reducer } from 'umi';
import type TagReferenceVo from './types';
import type { ProTableObject, TagVo } from './types';
import type { TableResponse } from './types/response/table';

export interface TagStateType {
  /**
   * tag表查到的标签。
   */
  tagList: TagVo[];
  /**
   * 评分标签。
   */
  rateTagList: TagVo[];
  /**
   * 用来标记收藏行为的标签。
   */
  favoriteTagList: TagVo[];
  /**
   * 当前资源的评分。
   */
  currentRate: TagReferenceVo | null;
  /**
   * 当前资源的收藏。
   */
  currentFavorite: TagReferenceVo | null;
}

export interface TagModelType {
  namespace: 'tag';
  state: TagStateType;
  effects: {
    /**
     * 查询标签列表，tag表。
     */
    queryTagList: Effect;
    /**
     * 查询用来打分的标签列表，tag表里name=0-10。
     */
    queryRateTagList: Effect;
    /**
     * 查询用来收藏的标签，tag表里name=收藏。
     */
    queryFavoriteTag: Effect;
    /**
     * 查询当前资源评分，tag_reference表resource_id=当前资源和name=0-10
     */
    queryCurrentRate: Effect;
    /**
     * 添加评分。
     */
    addRate: Effect;
    /**
     * 添加收藏。
     */
    addFavorite: Effect;
    /**
     * 查询当前资源是否被收藏，tag_reference表resource_id=当前资源且name=收藏。
     */
    queryCurrentFavorite: Effect;
  };
  reducers: {
    setTagList: Reducer<TagStateType>;
    setRateTagList: Reducer<TagStateType>;
    setFavoriteTagList: Reducer<TagStateType>;
    setCurrentRate: Reducer<TagReferenceVo>;
    setCurrentFavorite: Reducer<TagReferenceVo>;
  };
}

const model: TagModelType = {
  namespace: 'tag',
  state: {
    favoriteTagList: [],
    tagList: [],
    rateTagList: [],
    currentRate: null,
    currentFavorite: null,
  },
  effects: {
    *queryTagList({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setTagList',
          payload: data.data,
        });
      }
    },
    *queryRateTagList({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setRateTagList',
          payload: data.data,
        });
      }
    },
    *queryFavoriteTag({ payload }, { call, put }) {
      const data: ProTableObject<TagVo> = yield call(queryTagList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setFavoriteTagList',
          payload: data.data,
        });
      }
    },
    *queryCurrentRate({ payload }, { call, put }) {
      const data: ProTableObject<TagReferenceVo> = yield call(queryTagReferenceList, payload);
      if (parseTableResponse(data)) {
        if (data?.data.length > 0) {
          yield put({
            type: 'setCurrentRate',
            payload: data.data[0],
          });
        }
      }
    },
    *addRate({ payload }, { call, put }) {
      const data: TableResponse<TagReferenceVo> = yield call(addTag, payload);
      if (parseResponse(data)) {
        yield put({
          type: 'resource/fetchTagList',
          payload: {
            resourceId: payload.resourceId,
          },
        });
        yield put({
          type: 'setCurrentRate',
          payload: data.data,
        });
      }
    },
    *addFavorite({ payload }, { call, put }) {
      const data: TableResponse<TagReferenceVo> = yield call(addTag, payload);
      if (parseResponse(data)) {
        yield put({
          type: 'resource/fetchTagList',
          payload: {
            resourceId: payload.resourceId,
          },
        });
        yield put({
          type: 'queryCurrentFavorite',
          payload: {
            params: {
              resourceId: payload.resourceId,
              favorite: true,
            },
          },
        });
      }
    },
    *queryCurrentFavorite({ payload }, { call, put }) {
      const data: TableResponse<TagReferenceVo> = yield call(queryTagReferenceList, payload);
      if (parseTableResponse(data) && data.data.length === 1) {
        yield put({
          type: 'setCurrentFavorite',
          payload: data.data[0],
        });
      }
    },
  },
  reducers: {
    setTagList(state, { payload }) {
      return {
        ...state,
        tagList: payload,
      };
    },
    setRateTagList(state: TagStateType, { payload }) {
      return {
        ...state,
        rateTagList: payload,
      };
    },
    setFavoriteTagList(state: TagStateType, { payload }) {
      return {
        ...state,
        favoriteTagList: payload,
      };
    },
    setCurrentRate(state, { payload }) {
      return {
        ...state,
        currentRate: payload,
      };
    },
    setCurrentFavorite(state, { payload }) {
      return {
        ...state,
        currentFavorite: payload,
      };
    },
  },
};

export default model;
