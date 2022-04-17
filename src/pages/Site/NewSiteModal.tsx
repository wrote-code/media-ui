import { Form, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'umi';
import type { DefaultStateType } from '@/models/types';

interface PropsType {
  visible: boolean;
  handleCancel: any;
  dispatch: any;
}

const NewSiteModal: React.FC<any> = (props: PropsType) => {
  const { handleCancel } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values: any, errors: any) => {
      if (errors) {
        return false;
      } else {
        const { dispatch } = props;

        handleCancel(false);
      }
    });
  };

  return (
    <Modal
      okText="提交"
      visible={props.visible}
      title="新增站点"
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          label="站点名称"
          name="siteName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入站点名" />
        </Form.Item>
        <Form.Item
          name="url"
          label="网址"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="请输入网址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ working }: DefaultStateType) => ({
  working: working,
}))(NewSiteModal);
