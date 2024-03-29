import type { DefaultStateType } from "@/types/model";
import { Form, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'umi';

interface PropsType {
  visible: boolean;
  handleCancel: any;
  dispatch: any;
  /**
   * 表单弹框关闭后，刷新父组件。通常用于刷新查询表格。
   */
  reload: () => void;
}

const NewSiteModal: React.FC<any> = (props: PropsType) => {
  const { handleCancel, reload } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        const { dispatch } = props;
        dispatch({
          type: 'site/addSite',
          payload: {
            ...values,
          },
        });
        handleCancel(false);
        reload();
      })
      .catch((errors: any) => {
        if (errors) {
          return;
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
        {/* TODO 取消实时验证 */}
        <Form.Item name="url" label="网址" rules={[{ required: true }, { type: 'url' }]}>
          <Input placeholder="请输入网址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ working }: DefaultStateType) => ({
  working: working,
}))(NewSiteModal);
