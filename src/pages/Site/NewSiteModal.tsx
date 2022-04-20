import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
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
  // 网址前缀
  const [urlPrefix, setUrlPrefix] = useState('http://');

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const selectBefore = (
    <Select
      defaultValue="http://"
      className="select-before"
      onChange={(value) => setUrlPrefix(value)}
    >
      <Select.Option value="http://">http://</Select.Option>
      <Select.Option value="https://">https://</Select.Option>
    </Select>
  );

  const handleOk = () => {
    form.validateFields().then((values: any, errors: any) => {
      if (errors) {
        return false;
      } else {
        const { dispatch } = props;
        dispatch({
          type: 'site/addSite',
          payload: {
            ...values,
            url: urlPrefix + values.url,
            createTime: new Date(),
          },
        });
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
      <Form form={form} {...layout}>
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
          <Input placeholder="请输入网址" addonBefore={selectBefore} defaultValue="baidu.com" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ working }: DefaultStateType) => ({
  working: working,
}))(NewSiteModal);
