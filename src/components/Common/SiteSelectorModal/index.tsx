import type { SiteVo } from '@/models/types';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';
import { Table } from 'antd';

interface PropsType {
  siteList: SiteVo[];
}
/**
 * 从列表中选择网站，将勾选的站点的id返回父组件（通过回调函数）。
 * @param props 属性
 * @returns 选择框
 */
const SiteSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const { siteList } = props;
  useEffect(() => {
    dispatch({
      type: 'site/fetchSiteVoListPro',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: 1,
          pageSize: 10,
        },
      },
    });
  }, []);

  const columns: any = [
    {
      dataIndex: 'siteName',
      title: '网站名称',
    },
    {
      dataIndex: 'url',
      title: '网址',
    },
  ];
  return <Table columns={columns} dataSource={siteList} />;
};

export default connect(({ site }: any) => ({
  siteList: site.siteList,
}))(SiteSelectorModal);
