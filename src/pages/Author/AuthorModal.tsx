import { Modal, Form, Input } from 'antd';
import React from 'react';
import { connect } from 'umi';

const { Item } = Form;

interface PropsType {
  visible: boolean;
}

const AuthorModal: React.FC<PropsType> = (props) => {
  const { visible } = props;
  const form = Form.useForm();

  return (
    <Modal visible={visible} title="新增作者">
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Item>
        <Item name="userId" label="用户id">
          <Input />
        </Item>
        <Item name="homepage" label="用户主页">
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};

export default connect(() => ({
  hello: 'hello',
}))(AuthorModal);
