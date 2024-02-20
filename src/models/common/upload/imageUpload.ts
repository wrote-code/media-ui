import { queryFileList } from '@/services/upload';
import { FileInfo } from '@/types/entity';
import { TableResponse } from '@/types/response/table';
import { parseTableResponse } from '@/utils/utils';
import { Effect, Reducer } from 'umi';

export interface ImageUploadStateType {
  fileList: FileInfo[];
}

export interface ImageUploadModelType {
  namespace: 'upload/imageUpload';
  state: ImageUploadStateType;
  effects: {
    queryFileList: Effect;
  };
  reducers: {
    setFileList: Reducer;
  };
}

const ImageUpload: ImageUploadModelType = {
  namespace: 'upload/imageUpload',
  state: {
    fileList: [],
  },
  effects: {
    *queryFileList({ payload }, { put, call }) {
      const response: TableResponse<FileInfo> = yield call(queryFileList, payload);
      if (parseTableResponse(response)) {
        yield put({
          type: 'setFileList',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    setFileList(state, { payload }) {
      return {
        ...state,
        fileList: payload,
      };
    },
  },
};

export default ImageUpload;
