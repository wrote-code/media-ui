import type { AuthorStateType } from '@/models/author';
import type { AuthorVo } from '@/models/types';
import { queryList } from '@/services/author';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { connect, useDispatch } from 'umi';
import AuthorModal from './AuthorModal';

const Author: React.FC<AuthorStateType> = () => {
  const [authorModalVisible, setAuthorModalVisible] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    setAuthorModalVisible(false);
  };

  const deleteAuthor = (_dom: any, record: AuthorVo, index: number) => {
    dispatch({
      type: 'author/deleteAuthor',
      payload: record.id,
    });
  };

  const columns: ProColumns<AuthorVo>[] = [
    {
      dataIndex: 'userId',
      title: '用户id',
      hideInSearch: true,
    },
    {
      dataIndex: 'username',
      title: '用户名',
    },
    {
      dataIndex: ['site', 'siteName'],
      title: '用户来源',
    },
    {
      dataIndex: 'createTime',
      width: '30',
      title: '注册时间',
    },
    {
      dataIndex: 'updateTime',
      width: '30',
      title: '更新时间',
    },
    {
      dataIndex: 'option',
      title: '操作',
      width: '30',
      render: (_dom, record, index) => {
        return (
          <Popconfirm title="确认删除" onConfirm={() => deleteAuthor(_dom, record, index)}>
            <Button>删除</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <ProTable<AuthorVo>
        columns={columns}
        rowKey="id"
        request={async (params, sorter, filter) => queryList({ params, sorter, filter })}
        toolBarRender={() => [
          <Button key="button" onClick={() => setAuthorModalVisible(true)}>
            新建
          </Button>,
        ]}
      />
      {authorModalVisible && <AuthorModal visible={authorModalVisible} closeModal={closeModal} />}
    </div>
  );
};

export default connect((state: AuthorStateType) => ({
  ...state,
}))(Author);
