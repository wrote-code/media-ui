import type { SiteStateType } from '@/models/site';
import type { SiteVo } from '@/models/types';
import { fetchSiteVoListPro } from '@/services/site';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import Button from 'antd/es/button';
import Popconfirm from 'antd/es/popconfirm';
import React, { useState } from 'react';
import { connect, useDispatch } from 'umi';
import NewSiteModal from './NewSiteModal';

const Site: React.FC<SiteStateType> = (props) => {
  const [newSiteModalVisible, setNewSiteModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setNewSiteModalVisible(false);
  };

  const deleteSite = (record: SiteVo) => {
    dispatch({
      type: 'site/deleteSite',
      payload: {
        id: record.id,
      },
    });
  };

  const columns: ProColumns<SiteVo>[] = [
    {
      title: '网站名称',
      dataIndex: 'siteName',
      width: 300,
    },
    {
      title: '网站地址',
      dataIndex: 'url',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      width: 150,
      search: false,
    },
    {
      title: '操作',
      search: false,
      width: 50,
      render: (_, record: SiteVo) => {
        return (
          <Popconfirm title="确认删除" onConfirm={() => deleteSite(record)}>
            <Button size="small" type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      <ProTable<SiteVo>
        rowKey="id"
        defaultSize="small"
        columns={columns}
        request={async (params, sorter, filter) => fetchSiteVoListPro({ params, sorter, filter })}
        toolBarRender={() => (
          <Button
            onClick={() => {
              setNewSiteModalVisible(true);
            }}
          >
            新建
          </Button>
        )}
      />
      {newSiteModalVisible && (
        <NewSiteModal handleCancel={handleCancel} visible={newSiteModalVisible} />
      )}
    </div>
  );
};

export default connect(({ siteList }: SiteStateType) => ({
  siteList,
}))(Site);
