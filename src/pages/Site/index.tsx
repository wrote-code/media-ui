import { SiteStateType } from '@/models/site';
import { SiteVo } from '@/models/types';
import { fetchSiteVoListPro } from '@/services/site';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { connect } from 'umi';

const columns: ProColumns<SiteVo>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 30
  },
  {
    title: '网站名称',
    dataIndex: 'siteName'
  },
  {
    title: '网站地址',
    dataIndex: 'url'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime'
  }
];

const Site: React.FC<SiteStateType> = (props) => {

  return (
    <div>
      <ProTable<SiteVo>
        columns={columns}
        request={async (params, sorter, filter) => fetchSiteVoListPro({params, sorter, filter})}
      />
    </div>
  );
}

export default connect(({ siteList }: SiteStateType) => ({
  siteList
}))(Site);
