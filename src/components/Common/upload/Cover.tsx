import { ModelType } from '@/types/model';
import { Button, Upload } from 'antd';
import React from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  businessType: number;
  businessCode: string;
}

const Cover: React.FC<PropsType> = (props) => {
  const { businessCode, businessType } = props;
  const dispatch = useDispatch();

  dispatch({
    type: 'upload/cover/queryFileList',
    payload: {
      businessCode,
    },
  });

  return (
    <Upload listType="picture-card" data={{ businessCode, businessType }} action="/api/file/upload">
      <Button>上传</Button>
    </Upload>
  );
};

export default connect(({ 'upload/cover': { fileList } }: ModelType) => fileList)(Cover);
