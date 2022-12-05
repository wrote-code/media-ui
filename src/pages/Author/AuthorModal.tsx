import SiteSelectorModal from '@/components/Common/SiteSelectorModal';
import type { SiteVo } from '@/models/types';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';

const { Item } = Form;

interface PropsType {
  visible: boolean;
}

const AuthorModal: React.FC<PropsType> = (props) => {
  const { visible } = props;
  const [form] = Form.useForm();
  const [selectedSite, setSelectedSite] = useState(null);

  const [siteVisible, setSiteVisible] = useState(false);

  const onSelect = (record: SiteVo) => {
    setSelectedSite(record);
    form.setFieldsValue({
      siteId: record.id,
      siteName: record.siteName,
    });
    setSiteVisible(false);
  };

  const onOk = () => {
    setSiteVisible(false);
  };

  const onCancel = () => {
    setSiteVisible(false);
  };

  return (
    <Modal visible={visible} title="新增作者">
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form}>
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
        <Item name="siteName" label="网站">
          <Input onClick={() => setSiteVisible(true)} />
        </Item>
        <Item name="siteId" label="网站" hidden={true}>
          <Input />
        </Item>
        {siteVisible && (
          <SiteSelectorModal
            selectedSite={selectedSite}
            onSelect={onSelect}
            visible={siteVisible}
            onOk={onOk}
            onCancel={onCancel}
          />
        )}
      </Form>
    </Modal>
  );
};

export default connect(() => ({
  hello: 'hello',
}))(AuthorModal);
