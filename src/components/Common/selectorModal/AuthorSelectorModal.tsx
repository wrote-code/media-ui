import type { SelectModelType } from '@/models/common/model';
import type { AuthorVo } from '@/models/types';
import { Button, Form, Input, Modal, Table } from 'antd';
import type { Rule } from 'antd/lib/form';
import type { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  /**
   * 作者清单。
   */
  authorList: AuthorVo[];
  /**
   * 作者总量。
   */
  total: number;
  /**
   * 已选择的作者。
   */
  selectedAuthor: AuthorVo | null;
  /**
   * 选择的作者所在页。
   */
  currentPage: number;
  /**
   * 当分页改变后的回调，用于将当前页返回父组件。
   */
  setCurrentPage: (page: number) => void;
  /**
   * 关闭弹框的回调，由父组件控制。
   */
  onCancel: () => void;
  /**
   * 弹框可见性，由父组件控制。
   */
  visible: boolean;
  /**
   * 选择一行内容时的回调。回调中必须关闭弹框。由父组件控制。
   */
  onSelect: (record: AuthorVo) => void;
  /**
   * 弹框标题。
   */
  title?: string;
}

const AuthorSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { selectedAuthor, total, currentPage, setCurrentPage, title } = props;
  useEffect(() => {
    dispatch({
      type: 'modal/selectAuthor/queryAuthorList',
      payload: {
        filter: {},
        params: {
          current: 1,
          pageSize: 5,
        },
        sort: {},
      },
    });
  }, [dispatch]);

  const rowSelection = {
    type: 'radio',
    onSelect: props.onSelect,
    selectedRowKeys: selectedAuthor == null ? [] : [selectedAuthor.id],
  };

  const columns: ColumnsType<AuthorVo> = [
    {
      title: '用户id',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '网站',
      dataIndex: 'site.siteName',
    },
  ];

  const onPageChange = (page) => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'modal/selectAuthor/queryAuthorList',
      payload: {
        filter: {},
        params: {
          ...values,
          current: page,
          pageSize: 5,
        },
        sort: {},
      },
    });
    setCurrentPage(page);
  };

  const pagination: TablePaginationConfig = {
    current: currentPage,
    pageSize: 5,
    onChange: onPageChange,
    total: total,
  };

  const search = () => {
    const values = form.getFieldsValue();
    dispatch({
      type: 'modal/selectAuthor/queryAuthorList',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: currentPage,
          pageSize: 5,
          ...values,
        },
      },
    });
  };

  const searchForm = () => {
    const style = {
      display: 'inline-flex',
      width: '40%',
      marginLeft: 5,
    };
    const rules: Rule[] = [
      {
        type: 'string',
        min: 1,
      },
      {
        whitespace: true,
        message: '输入不能为空白字符',
      },
    ];

    return (
      <Form form={form}>
        <Form.Item style={style} rules={rules} label="用户标识" name="userId">
          <Input />
        </Form.Item>
        <Form.Item style={style} rules={rules} label="用户名" name="username">
          <Input />
        </Form.Item>
        <Button style={{ marginLeft: 5 }} type="primary" onClick={() => search()}>
          搜索
        </Button>
      </Form>
    );
  };

  return (
    <Modal
      title={title ? title : '选择作者'}
      onCancel={props.onCancel}
      onOk={() => props.onSelect}
      visible={props.visible}
    >
      {searchForm()}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.authorList}
        size="small"
        rowKey="id"
        pagination={pagination}
      />
    </Modal>
  );
};

export default connect(({ 'modal/selectAuthor': { authorList, total } }: SelectModelType) => ({
  authorList: authorList,
  total: total,
}))(AuthorSelectorModal);
