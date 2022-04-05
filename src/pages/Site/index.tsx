import type { SiteStateType } from '@/models/site';
import type { SiteVo } from '@/models/types';
import { fetchSiteVoListPro } from '@/services/site';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';

const columns: ProColumns<SiteVo>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 30,
  },
  {
    title: '网站名称',
    dataIndex: 'siteName',
  },
  {
    title: '网站地址',
    dataIndex: 'url',
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    search: false,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    search: false,
  },
];

const Site: React.FC<SiteStateType> = (props) => {
  return (
    <div>
      <ProTable<SiteVo>
        columns={columns}
        request={async (params, sorter, filter) => fetchSiteVoListPro({ params, sorter, filter })}
      />
    </div>
  );
};

export default connect(({ siteList }: SiteStateType) => ({
  siteList,
}))(Site);
