import { queryAlbumList } from '@/services/album';
import { AlbumVo } from '@/types/entity';
import { TableResponse } from '@/types/response/table';
import { parseTableResponse } from '@/utils/utils';
import { Effect, Reducer } from 'umi';

export interface AlbumSelectModalStateType {
  albumList: AlbumVo[];
  total: number;
}

interface ModelType {
  namespace: 'selectModal/albumSelectModal';
  state: AlbumSelectModalStateType;
  effects: {
    queryAlbumList: Effect;
  };
  reducers: {
    setAlbumList: Reducer<AlbumVo>;
  };
}

const AlbumSelectModal: ModelType = {
  namespace: 'selectModal/albumSelectModal',
  state: {
    albumList: [],
    total: 0,
  },
  effects: {
    *queryAlbumList({ payload }, { put, call }) {
      const data: TableResponse<AlbumVo> = yield call(queryAlbumList, payload);
      if (parseTableResponse(data)) {
        yield put({
          type: 'setAlbumList',
          payload: {
            albumList: data.data,
            total: data.total,
          },
        });
      }
    },
  },
  reducers: {
    setAlbumList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default AlbumSelectModal;
