import { useDispatch } from 'umi';
import AuthorSelectorModal from '@/components/Common/SelectorModal/AuthorSelectorModal';
import type { AuthorVo, ResourceVo } from '@/models/types';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Col, Form, Row } from 'antd';
import React, { useState } from 'react';

interface FormType extends ResourceVo {
  /**
   * 资源对应的文件名。
   */
  filename: string;
  /**
   * 资源所在目录。
   */
  dir: string;
  /**
   * 作者标识，author.id，不是author.useId。
   */
  authorId: string;
  /**
   * 作者名称。
   */
  authorName: string;
  /**
   * 第一次出现的专辑，可选。
   */
  albumId?: string;
  /**
   * 专辑名称。
   */
  albumName?: string;
}

const ResourceFormModal: React.FC<FormType> = () => {
  const [authorVisible, setAuthorVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [form] = Form.useForm<FormType>();
  const dispatch = useDispatch();

  const onSelect = (author: AuthorVo) => {
    setSelectedAuthor(author);
    setAuthorVisible(false);
    form.setFieldsValue({
      authorId: author.id,
      authorName: author.username,
    });
  };

  const onFinish = async (values) => {
    dispatch({
      type: 'resource/addResource',
      payload: {
        authorId: values.authorId,
        dir: values.dir,
        filename: values.filename,
      },
    });
    return true;
  };

  return (
    <ModalForm
      onFinish={onFinish}
      title="添加资源"
      trigger={<Button>新建</Button>}
      form={form}
      width={500}
    >
      <ProFormText label="资源名称" name="filename" rules={[{ required: true, max: 90 }]} />
      <ProFormText label="资源目录" name="dir" rules={[{ required: true, max: 900 }]} />
      <Row gutter={16}>
        {/* BUG 点击清除时会弹框  */}
        <Col span={12} onClick={() => setAuthorVisible(true)}>
          <ProFormText hidden={true} name="authorId" rules={[{ required: true, max: 90 }]} />
          <ProFormText label="作者姓名" name="authorName" rules={[{ required: true, max: 90 }]} />
        </Col>
        <Col span={12}>
          <ProFormText label="专辑名称" name="albumName" rules={[{ max: 90 }]} />
        </Col>
      </Row>
      {authorVisible && (
        <AuthorSelectorModal
          currentPage={currentPage}
          selectedAuthor={selectedAuthor}
          visible={authorVisible}
          onCancel={() => setAuthorVisible(false)}
          onSelect={onSelect}
          setCurrentPage={setCurrentPage}
        />
      )}
    </ModalForm>
  );
};

export default ResourceFormModal;
