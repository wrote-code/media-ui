import type { SiteVo } from '@/models/types';
import { Modal, Table } from 'antd';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  /**
   * 从redux获取的网站清单。
   */
  siteList?: SiteVo[];
  /**
   * 从redux中获取的网站总量。
   */
  total?: number;
  /**
   * 当前页，由父组件传入。
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
  onSelect: (record: SiteVo) => void;
  /**
   * 当前选择的网站。第一次打开时为空。由父组件控制。
   */
  selectedSite: SiteVo;
}

/**
 * 从列表中选择网站，将勾选的站点的id返回父组件（通过回调函数）。
 *
 * 此组件会从调用model:site/fetchSiteVoListPro来获取网站清单，默认情况下一次获取5个。目前
 * 无法更改此默认值。
 *
 * @param props 属性
 * @returns 选择框
 */
const SiteSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  const { siteList, total, currentPage, setCurrentPage } = props;

  useEffect(() => {
    dispatch({
      type: 'site/fetchSiteVoListPro',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: currentPage,
          pageSize: 5,
        },
      },
    });
  }, []);

  const rowSelection = {
    type: 'radio',
    onSelect: props.onSelect,
    selectedRowKeys: props.selectedSite == null ? [] : [props.selectedSite.id],
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    dispatch({
      type: 'site/fetchSiteVoListPro',
      payload: {
        filter: {},
        sort: {},
        params: {
          current: page,
          pageSize: pageSize,
        },
      },
    });
  };

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
  return (
    <Modal title="请选择网站" visible={props.visible} onCancel={props.onCancel} footer={null}>
      <Table
        pagination={{
          current: currentPage,
          pageSize: 5,
          total,
          onChange: onPageChange,
        }}
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        dataSource={siteList}
      />
    </Modal>
  );
};

export default connect(({ site }: any) => ({
  siteList: site.siteList,
  total: site.total,
}))(SiteSelectorModal);
