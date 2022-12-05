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
   * 点击确认按钮的回调。此方法需要设置使用
   */
  onOk: () => void;
  onCancel: () => void;
  visible: boolean;
  /**
   * 选择一行内容时的回调。回调中必须关闭弹框。
   */
  onSelect: (record: SiteVo) => void;
  /**
   * 当前选择的网站。第一次打开时为空。
   */
  selectedSite: SiteVo;
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

  const rowSelection = {
    type: 'radio',
    onSelect: props.onSelect,
    selectedRowKeys: props.selectedSite == null ? [] : [props.selectedSite.id],
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
    <Modal
      title="请选择网站"
      onOk={props.onOk}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={null}
    >
      <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={siteList} />
    </Modal>
  );
};

export default connect(({ site }: any) => ({
  siteList: site.siteList,
}))(SiteSelectorModal);
