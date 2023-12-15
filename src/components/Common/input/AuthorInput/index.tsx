import type { AuthorVo } from '@/models/types';
import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
import React, { useState } from 'react';
import AuthorSelectorModal from '../../selectorModal/AuthorSelectorModal';

/**
 * 作者输入框
 */
export interface AuthorInputPropsType {
  /**
   * 作者弹框的标题。
   */
  title?: string;
  /**
   * 表单实例。
   */
  form: FormInstance;
  /**
   * 作者名称对用表单name。
   */
  labelName: string;
  /**
   * 作者id对应的表单名称。
   */
  valueName: string;
  /**
   * 保存作者名称的元素属性。
   */
  labelProps?: any;
  /**
   * 保存作者id的元素属性。
   */
  valueProps?: any;
  formProps?: any;
}

const AuthorInput: React.FC<AuthorInputPropsType> = (props) => {
  const { form, labelName, valueName, title } = props;

  const [visible, setVisible] = useState(false);
  const [author, setAuthor] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const onCancel = () => {
    setVisible(false);
  };

  const onSelect = (record: AuthorVo) => {
    setAuthor(record);
    const v = {};
    v[labelName] = record.username;
    v[valueName] = record.id;
    form.setFieldsValue(v);
    onCancel();
  };

  return (
    <div>
      <Form.Item name={labelName}>
        <Input onClick={() => setVisible(true)} />
      </Form.Item>
      <Form.Item name={valueName} hidden={true}>
        <Input />
      </Form.Item>
      <AuthorSelectorModal
        title={title}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onCancel={() => onCancel()}
        selectedAuthor={author}
        visible={visible}
        onSelect={onSelect}
      />
    </div>
  );
};

export default AuthorInput;
