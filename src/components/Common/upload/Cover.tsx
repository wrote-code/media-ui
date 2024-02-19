import { FileInfo } from '@/types/entity';
import { ModelType } from '@/types/model';
import { Button, Modal, Upload, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  businessType: number;
  businessCode: string;
  currentFileList: FileInfo[];
}

const Cover: React.FC<PropsType> = (props) => {
  const { businessCode, businessType, currentFileList } = props;
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'upload/cover/queryFileList',
      payload: {
        businessCode,
      },
    });
    const list = currentFileList.map((f) => ({
      uid: f.id,
      name: f.originalFilename,
      url: `/api/file/getFile?id=${f.id}`,
    }));
    setFileList(list);
  }, [dispatch]);

  const handleFileChange = (info: UploadChangeParam) => {
    const { fileList, file } = info;
    const newList = fileList.map((f) => {
      if (f.response) {
        if (f.response.statusCode === '00000000') {
          message.success('上传成功');
          return {
            uid: f.response.data.id,
            name: f.response.data.originalFilename,
            url: `/api/file/getFile?id=${f.response.data.id}`,
          };
        } else {
          message.success('上传失败');
        }
      }
      return f;
    });
    setFileList(newList);
  };

  const handleCancel = () => setShowPreview(false);

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url);
    setShowPreview(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  return (
    <>
      <Upload
        listType="picture-card"
        data={{ businessCode, businessType }}
        action="/api/file/upload"
        // defaultFileList={list}
        fileList={fileList}
        onChange={handleFileChange}
        onPreview={handlePreview}
      >
        <Button>上传</Button>
      </Upload>
      <Modal visible={showPreview} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="图片不存在" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default connect(({ 'upload/cover': { fileList } }: ModelType) => ({
  currentFileList: fileList,
}))(Cover);
