import type { ResourceVo } from '@/models/types';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Col, Form, Row } from 'antd';
import React from 'react';

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
   * 第一次出现的专辑，可选。
   */
  albumId?: string;
}

const ResourceFormModal: React.FC<FormType> = () => {
  const [form] = Form.useForm<FormType>();

  return (
    <ModalForm title="添加资源" trigger={<Button>新建</Button>} form={form} width={500}>
      <ProFormText label="资源名称" name="filename" rules={[{ required: true, max: 90 }]} />
      <ProFormText label="资源目录" name="dir" rules={[{ required: true, max: 900 }]} />
      <Row gutter={16}>
        <Col span={12}>
          <ProFormText label="作者姓名" name="authorName" rules={[{ required: true, max: 90 }]} />
        </Col>
        <Col span={12}>
          <ProFormText label="专辑名称" name="albumName" rules={[{ max: 90 }]} />
        </Col>
      </Row>
      {/* <ProFormText name="authorId" rules={[{ required: true, max: 19 }]} hidden={true} />
      <ProFormText name="albumId" rules={[{ max: 19 }]} hidden={true} /> */}
    </ModalForm>
  );
};

export default ResourceFormModal;
