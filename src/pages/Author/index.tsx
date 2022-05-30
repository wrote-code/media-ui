import type { AuthorStateType } from '@/models/author';
import type { AuthorVo } from '@/models/types';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Button from 'antd/es/button';
import React, { useState } from 'react';
import { connect } from 'umi';
import AuthorModal from './AuthorModal';

const Author: React.FC<AuthorStateType> = (props: AuthorStateType) => {
  const [authorModalVisible, setAuthorModalVisible] = useState(false);

  const columns: ProColumns<AuthorVo>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 30,
    },
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
      dataIndex: 'siteVo.url',
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
        toolBarRender={() => [<Button key="button" onClick={() => setAuthorModalVisible(true)}>新建</Button>]}
      />
      {authorModalVisible && <AuthorModal visible={authorModalVisible}/>}
    </div>
  );
};

export default connect((state: AuthorStateType) => ({
  ...state,
}))(Author);
