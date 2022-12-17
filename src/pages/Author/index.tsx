import type { AuthorStateType } from '@/models/author';
import type { AuthorVo } from '@/models/types';
import { queryList } from '@/services/author';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Button from 'antd/es/button';
import React, { useState } from 'react';
import { connect } from 'umi';
import AuthorModal from './AuthorModal';

const Author: React.FC<AuthorStateType> = () => {
  const [authorModalVisible, setAuthorModalVisible] = useState(false);

  const closeModal = () => {
    setAuthorModalVisible(false);
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
      render: () => {
        return <Button>删除</Button>;
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
