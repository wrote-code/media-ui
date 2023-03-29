import type { SelectModalType } from '@/models/common/modal';
import type { AuthorVo } from '@/models/types';
import { Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'umi';

interface PropsType {
  /**
   * 作者清单。
   */
  authorList: AuthorVo[];
  /**
   * 作者总量。
   */
  total: number;
  /**
   * 已选择的作者。
   */
  selectedAuthor: AuthorVo | null;
  /**
   * 选择的作者所在页。
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
  onSelect: (record: AuthorVo) => void;
}

const AuthorSelectorModal: React.FC<PropsType> = (props: PropsType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'modal/selectAuthor/queryAuthorList',
      payload: {
        filter: {},
        params: {
          current: 1,
          pageSize: 5,
        },
        sort: {},
      },
    });
  });

  const columns: ColumnsType<AuthorVo> = [
    {
      title: '用户id',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '网站',
      dataIndex: 'site.siteName',
    },
  ];

  return (
    <Modal onCancel={props.onCancel} onOk={() => props.onSelect} visible={props.visible}>
      <Table columns={columns} dataSource={props.authorList} size="small" key="id" />
    </Modal>
  );
};

export default connect(({ 'modal/selectAuthor': { authorList, total } }: SelectModalType) => ({
  authorList: authorList,
  total: total,
}))(AuthorSelectorModal);
