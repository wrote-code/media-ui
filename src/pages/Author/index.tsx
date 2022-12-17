import SiteSelectorModal from '@/components/Common/SiteSelectorModal';
import type { AuthorStateType } from '@/models/author';
import type { AuthorVo, SiteVo } from '@/models/types';
import { queryList } from '@/services/author';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { connect, useDispatch } from 'umi';
import AuthorModal from './AuthorModal';

const Author: React.FC<AuthorStateType> = () => {
  const [authorModalVisible, setAuthorModalVisible] = useState(false);
  const [siteSelectorVisible, setSiteSelectorVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSites, setSelectedSites] = useState(null);

  const formRef = useRef<ProFormInstance>();

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

  const onSiteSelect = (site: SiteVo) => {
    const form = formRef.current;
    form?.setFieldsValue({
      siteId: site.id,
      siteName: site.siteName,
    });
    setSelectedSites(site);
    setSiteSelectorVisible(false);
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
      formItemProps: {
        name: 'siteName',
      },
      renderFormItem: () => {
        return <Input onClick={() => setSiteSelectorVisible(true)} />;
      },
    },
    {
      dataIndex: 'siteIdFormKey',
      hideInTable: true,
      formItemProps: {
        name: 'siteId',
      },
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
        formRef={formRef}
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
      {siteSelectorVisible && (
        <SiteSelectorModal
          onSelect={onSiteSelect}
          currentPage={page}
          setCurrentPage={setPage}
          selectedSite={selectedSites}
          onCancel={() => setSiteSelectorVisible(false)}
          visible={siteSelectorVisible}
        />
      )}
    </div>
  );
};

export default connect((state: AuthorStateType) => ({
  ...state,
}))(Author);
