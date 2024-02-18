import { FileInfo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { Button, Upload } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  businessType: number;
  businessCode: string;
  fileList: FileInfo[];
}

const Cover: React.FC<PropsType> = (props) => {
  const { businessCode, businessType, fileList } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'upload/cover/queryFileList',
      payload: {
        businessCode,
      },
    });
  }, [dispatch]);

  const list = fileList.map((e) => ({
    name: e.originalFilename,
    url: `/api/file/getFile?filename=${e.filename}`,
  }));

  return (
    <Upload
      listType="picture-card"
      data={{ businessCode, businessType }}
      action="/api/file/upload"
      fileList={list}
    >
      <Button>上传</Button>
    </Upload>
  );
};

export default connect(({ 'upload/cover': { fileList } }: ModelType) => ({
  fileList,
}))(Cover);
