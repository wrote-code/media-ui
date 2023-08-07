import AuthorSelectorModal from '@/components/Common/selectorModal/AuthorSelectorModal';
import type { AuthorVo, ResourceVo } from '@/models/types';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'umi';
import DirectorySelect from '@/components/Common/Select/DirectorySelect';

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
  /**
   * 刷新父组件。
   */
  reload: () => void;
}

const ResourceFormModal: React.FC<FormType> = (props: FormType) => {
  const { reload } = props;

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
    form.resetFields();
    setSelectedAuthor({});
    reload();
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
      <DirectorySelect />
      <ProFormText hidden={true} name="authorId" rules={[{ required: true, max: 90 }]} />
      <ProFormText
        fieldProps={{
          onClick: () => setAuthorVisible(true),
          onFocus: () => setAuthorVisible(true),
        }}
        label="作者姓名"
        name="authorName"
        rules={[{ required: true, max: 90 }]}
      />
      {authorVisible && (
        <AuthorSelectorModal
          title="设置资源创建者"
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
