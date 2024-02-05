import { addAlbum } from '@/services/album';
import type { AlbumVo } from '@/types/entity';
import type { ResponseData } from '@/types/response/response';
import { parseResponse } from '@/utils/utils';
import { message } from 'antd';
import type { Effect } from 'umi';

export interface AlbumModelState {}

interface AlbumModelType {
  namespace: 'album';
  state: AlbumModelState;
  effects: {
    addAlbum: Effect;
  };
}

const albumModel: AlbumModelType = {
  namespace: 'album',
  state: {},
  effects: {
    *addAlbum({ payload }, { call }) {
      const data: ResponseData<AlbumVo> = yield call(addAlbum, payload);
      if (parseResponse(data)) {
        message.info('专辑');
      }
    },
  },
};

export default albumModel;
